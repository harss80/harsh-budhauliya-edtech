const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const Test = require('../models/Test');
const QuestionBank = require('../models/QuestionBank');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const axios = require('axios');

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

router.post('/generate-neet-full', asyncHandler(async (req, res) => {
  const body = req.body || {};
  const excludeIds = Array.isArray(body.excludeIds) ? body.excludeIds : [];
  const preferDiagrams = body.preferDiagrams !== false;
  const hardRatio = Math.min(Math.max(parseFloat(body.hardRatio || '0.5'), 0), 1);

  const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const pickWithDifficulty = (pool, count) => {
    const hard = pool.filter(q => String(q.difficulty || '').toLowerCase() === 'hard');
    const mid = pool.filter(q => String(q.difficulty || '').toLowerCase() === 'medium');
    const std = pool.filter(q => !['hard', 'medium'].includes(String(q.difficulty || '').toLowerCase()));

    const hardCount = Math.round(count * hardRatio);
    const remaining = count - hardCount;
    const midCount = Math.round(remaining * 0.6);
    const stdCount = count - hardCount - midCount;

    const selected = [];
    selected.push(...shuffle(hard).slice(0, hardCount));
    selected.push(...shuffle(mid).slice(0, midCount));
    selected.push(...shuffle(std).slice(0, stdCount));

    if (selected.length < count) {
      const used = new Set(selected.map(q => String(q._id)));
      const rest = shuffle(pool.filter(q => !used.has(String(q._id))));
      selected.push(...rest.slice(0, count - selected.length));
    }

    return shuffle(selected).slice(0, count);
  };

  const baseQuery = { exam: 'NEET' };
  if (excludeIds.length > 0) baseQuery._id = { $nin: excludeIds };

  const [phyAll, chemAll, bioAll] = await Promise.all([
    QuestionBank.find({ ...baseQuery, subject: 'Physics' }).limit(5000),
    QuestionBank.find({ ...baseQuery, subject: 'Chemistry' }).limit(5000),
    QuestionBank.find({ ...baseQuery, subject: 'Biology' }).limit(10000),
  ]);

  const bumpDiagrams = (pool, targetCount) => {
    if (!preferDiagrams) return pool;
    const diag = pool.filter(q => q.imageUrl || (Array.isArray(q.tags) && q.tags.includes('diagram')));
    const non = pool.filter(q => !(q.imageUrl || (Array.isArray(q.tags) && q.tags.includes('diagram'))));
    const diagTarget = Math.min(Math.round(targetCount * 0.1), diag.length);
    return shuffle([...shuffle(diag).slice(0, diagTarget), ...shuffle(non)]);
  };

  const phy = bumpDiagrams(phyAll, 45);
  const chem = bumpDiagrams(chemAll, 45);
  const bio = bumpDiagrams(bioAll, 90);

  const selected = [
    ...pickWithDifficulty(phy, 45),
    ...pickWithDifficulty(chem, 45),
    ...pickWithDifficulty(bio, 90),
  ];

  if (selected.length < 180) {
    return res.status(400).json({ error: 'Not enough questions in question bank. Import more NEET questions first.' });
  }

  const questions = selected.slice(0, 180).map((q) => ({
    text: q.text,
    imageUrl: q.imageUrl,
    options: q.options || [],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    subject: q.subject,
    chapter: q.chapter,
    difficulty: q.difficulty,
  }));

  const t = await Test.create({
    name: body.name || `NEET Full Syllabus Mock - ${new Date().toLocaleDateString()}`,
    subject: 'NEET',
    duration: 200,
    scheduledAt: new Date(),
    published: true,
    generated: true,
    sourceName: 'QuestionBank',
    sourceSummary: `Generated from QuestionBank with hardRatio=${hardRatio}`,
    questions
  });

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

router.post('/generate-ncert', asyncHandler(async (req, res) => {
  const body = req.body || {};
  const classNumber = String(body.classNumber || '6');
  const book = body.book || {};
  const chapters = Array.isArray(body.chapters) ? body.chapters.slice(0, 5) : [];
  const minCount = Math.max(parseInt(body.questionCount || '50', 10), 50);
  const subject = book.subject || 'General';
  if (!book || !book.name || chapters.length === 0) return res.status(400).json({ error: 'book and chapters required' });

  const searchAndExtract = async (query) => {
    try {
      const search = await axios.get('https://en.wikipedia.org/w/api.php', { params: { action: 'query', list: 'search', srsearch: query, format: 'json' } });
      const hits = search.data?.query?.search || [];
      if (hits.length === 0) return '';
      const pageid = hits[0].pageid;
      const page = await axios.get('https://en.wikipedia.org/w/api.php', { params: { action: 'query', prop: 'extracts', explaintext: 1, pageids: pageid, format: 'json' } });
      const pages = page.data?.query?.pages || {};
      const extract = pages[pageid]?.extract || '';
      return String(extract);
    } catch (e) {
      return '';
    }
  };

  const buildQuestions = (text, targetChapter) => {
    const sentences = String(text || '').replace(/\s+/g, ' ').split(/[.!?]\s+/).filter(s => s && s.length > 40);
    const words = String(text || '').toLowerCase().match(/\b[a-z]{5,}\b/g) || [];
    const wordPool = Array.from(new Set(words));
    const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const pickDistractors = (correct) => {
      const pool = wordPool.filter(w => w !== correct);
      const ds = new Set();
      while (ds.size < 3 && pool.length > 0) ds.add(rand(pool));
      const list = Array.from(ds);
      while (list.length < 3) list.push(correct + list.length);
      return list;
    };
    const qs = [];
    for (let i = 0; i < sentences.length && qs.length < minCount; i++) {
      const s = sentences[i];
      const tokens = s.split(' ');
      const candidates = tokens.filter(t => /^[A-Za-z][A-Za-z-]{4,}$/.test(t)).map(t => t.replace(/[^A-Za-z-]/g, ''));
      if (candidates.length === 0) continue;
      const answer = rand(candidates);
      const blanked = s.replace(new RegExp(`\\b${answer.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`), '____');
      const distractors = pickDistractors(answer.toLowerCase());
      const optionsRaw = [answer, ...distractors];
      for (let k = optionsRaw.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [optionsRaw[k], optionsRaw[j]] = [optionsRaw[j], optionsRaw[k]]; }
      const mapId = ['A','B','C','D'];
      const options = optionsRaw.slice(0,4).map((opt, idx) => ({ id: mapId[idx], text: String(opt) }));
      const correctIdx = options.findIndex(o => o.text.toLowerCase() === answer.toLowerCase());
      const correctAnswer = mapId[Math.max(0, correctIdx)];
      qs.push({ text: `Fill in the blank: ${blanked}`, options, correctAnswer, explanation: `Based on ${targetChapter}`, subject, chapter: targetChapter, difficulty: (i % 3 === 0) ? 'Hard' : ((i % 3 === 1) ? 'Medium' : 'Standard') });
    }
    while (qs.length < minCount) {
      const answer = (wordPool[qs.length % (wordPool.length || 1)] || 'concept');
      const sentence = `${targetChapter} is related to ____ in ${book.name}.`;
      const distractors = pickDistractors(answer);
      const optionsRaw = [answer, ...distractors];
      for (let k = optionsRaw.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [optionsRaw[k], optionsRaw[j]] = [optionsRaw[j], optionsRaw[k]]; }
      const mapId = ['A','B','C','D'];
      const options = optionsRaw.slice(0,4).map((opt, idx) => ({ id: mapId[idx], text: String(opt) }));
      const correctIdx = options.findIndex(o => o.text.toLowerCase() === String(answer).toLowerCase());
      const correctAnswer = mapId[Math.max(0, correctIdx)];
      qs.push({ text: `Fill in the blank: ${sentence}`, options, correctAnswer, explanation: `Topic: ${targetChapter}`, subject, chapter: targetChapter, difficulty: 'Standard' });
    }
    return qs.slice(0, minCount);
  };

  let aggregated = [];
  for (const ch of chapters) {
    const queries = [
      `${ch} Class ${classNumber} NCERT`,
      `${book.name} ${ch} NCERT`,
      `${ch} ${book.subject}`
    ];
    let text = '';
    for (const q of queries) { if (text.length < 500) { const t = await searchAndExtract(q); if (t && t.length > text.length) text = t; } }
    if (!text || text.length < 200) text = `${ch} ${book.name} ${book.subject} Class ${classNumber}`.repeat(50);
    const qs = buildQuestions(text, ch);
    aggregated = aggregated.concat(qs);
    if (aggregated.length >= minCount) break;
  }
  if (aggregated.length < minCount && chapters.length > 0) {
    aggregated = aggregated.concat(buildQuestions(chapters.join(' '), chapters[0]));
  }

  const name = body.name || `NCERT Class ${classNumber} - ${book.name}`;
  const t = await Test.create({
    name,
    subject,
    duration: parseInt(body.duration || '60', 10),
    scheduledAt: new Date(),
    published: true,
    generated: true,
    sourceName: `${book.name} Chapters`,
    sourceSummary: `Auto-generated from Wikipedia for ${chapters.join(', ')}`,
    questions: aggregated
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
