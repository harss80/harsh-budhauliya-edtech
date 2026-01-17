const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const Test = require('../models/Test');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const list = await Test.find({}).sort({ createdAt: -1 }).limit(1000);
  res.json(list);
}));

router.post('/', asyncHandler(async (req, res) => {
  const data = req.body || {};
  const t = await Test.create(data);
  res.status(201).json(t);
}));

router.patch('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = req.body || {};
  const updated = await Test.findByIdAndUpdate(id, data, { new: true });
  res.json(updated);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Test.findByIdAndDelete(id);
  res.json({ ok: true });
}));

module.exports = router;
