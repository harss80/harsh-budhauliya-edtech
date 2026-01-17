const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const Notification = require('../models/Notification');
const User = require('../models/User');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const list = await Notification.find({}).sort({ createdAt: -1 }).limit(500);
  res.json(list);
}));

router.post('/', asyncHandler(async (req, res) => {
  const { title, message } = req.body || {};
  if (!title || !message) return res.status(400).json({ error: 'title and message required' });
  const n = await Notification.create({ title, message });
  res.status(201).json(n);
}));

router.patch('/:id/read', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { userId, email } = req.body || {};
  let uid = userId || null;
  if (!uid && email) {
    const u = await User.findOne({ email }).select('_id');
    if (u) uid = u._id;
  }
  if (!uid) return res.status(400).json({ error: 'userId or email required' });
  await Notification.findByIdAndUpdate(id, { $addToSet: { readBy: uid } });
  res.json({ ok: true });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Notification.findByIdAndDelete(id);
  res.json({ ok: true });
}));

module.exports = router;
