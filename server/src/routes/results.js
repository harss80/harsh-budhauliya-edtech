const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const TestResult = require('../models/TestResult');
const User = require('../models/User');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: 'email required' });
  const user = await User.findOne({ email }).select('_id');
  if (!user) return res.json([]);
  const list = await TestResult.find({ userId: user._id }).sort({ createdAt: -1 }).limit(200);
  res.json(list);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { email, result } = req.body || {};
  if (!email || !result) return res.status(400).json({ error: 'email and result required' });
  const user = await User.findOne({ email }).select('_id');
  if (!user) return res.status(404).json({ error: 'user not found' });
  const saved = await TestResult.create({ userId: user._id, ...result });
  res.status(201).json(saved);
}));

module.exports = router;
