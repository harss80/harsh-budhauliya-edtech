const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const Test = require('../models/Test');
const multer = require('multer');
const pdfParse = require('pdf-parse');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.get('/', asyncHandler(async (req, res) => {
  const list = await Test.find({}).sort({ createdAt: -1 }).limit(1000);
  res.json(list);
}));

router.get('/public', asyncHandler(async (req, res) => {
  const now = new Date();
  const list = await Test.find({
    published: true,
    $or: [
      { $and: [ { visibleFrom: { $exists: true } }, { visibleUntil: { $exists: true } }, { visibleFrom: { $lte: now } }, { visibleUntil: { $gte: now } } ] },
      { $and: [ { visibleFrom: { $exists: false } }, { visibleUntil: { $exists: false } } ] }
    ]
  }).sort({ scheduledAt: -1, createdAt: -1 }).limit(1000);
  res.json(list);
}));

router.post('/', asyncHandler(async (req, res) => {
  const data = req.body || {};
  const t = await Test.create(data);
  res.status(201).json(t);
}));

// Define file-based generation BEFORE the catch-all id route
router.post('/generate-from-pdf', upload.single('file'), asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'PDF required' });
  if (file.mimetype !== 'application/pdf') return res.status(400).json({ error: 'Invalid file type' });

  const name = req.body.name || 'Generated Test';
  const subject = req.body.subject || 'General';
  const duration = parseInt(req.body.duration || '60', 10);
  const scheduleAt = req.body.scheduleAt ? new Date(req.body.scheduleAt) : new Date();
  const visibleFrom = scheduleAt;
  const visibleUntil = new Date(visibleFrom.getTime() + 24 * 60 * 60 * 1000);

  const parsed = await pdfParse(file.buffer);
  const text = (parsed.text || '').replace(/\s+/g, ' ').trim();
  const summary = text.split('. ').slice(0, 5).join('. ').slice(0, 1000);

  const sentences = text.split('. ').filter(Boolean).slice(0, 40);
  const baseQ = sentences.slice(0, 10);
  const questions = baseQ.map((s, idx) => {
    const qText = s.length > 200 ? s.slice(0, 200) + '...' : s;
    const options = [
      { id: 'A', text: 'Option A' },
      { id: 'B', text: 'Option B' },
      { id: 'C', text: 'Option C' },
      { id: 'D', text: 'Option D' }
    ];
    const correct = ['A','B','C','D'][idx % 4];
    return { text: qText, options, correctAnswer: correct, explanation: 'Refer to the summarized context.', subject, difficulty: (idx % 3 === 0) ? 'Hard' : ((idx % 3 === 1) ? 'Medium' : 'Standard') };
  });

  const t = await Test.create({
    name,
    subject,
    duration,
    scheduledAt: scheduleAt,
    published: true,
    visibleFrom,
    visibleUntil,
    generated: true,
    sourceName: file.originalname,
    sourceSummary: summary,
    questions
  });

  res.status(201).json(t);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  const t = await Test.findById(id);
  if (!t) return res.status(404).json({ error: 'Not found' });
  res.json(t);
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
