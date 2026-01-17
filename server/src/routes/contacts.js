const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const Contact = require('../models/Contact');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const status = req.query.status; // optional filter
  const q = status && status !== 'all' ? { status } : {};
  const list = await Contact.find(q).sort({ createdAt: -1 }).limit(1000);
  res.json(list);
}));

router.post('/', asyncHandler(async (req, res) => {
  const data = req.body || {};
  const c = await Contact.create(data);
  res.status(201).json(c);
}));

router.patch('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body || {};
  const updated = await Contact.findByIdAndUpdate(id, { status, resolvedAt: status === 'resolved' ? new Date() : null }, { new: true });
  res.json(updated);
}));

router.delete('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Contact.findByIdAndDelete(id);
  res.json({ ok: true });
}));

module.exports = router;
