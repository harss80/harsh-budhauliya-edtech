const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const QuestionBank = require('../models/QuestionBank');
const axios = require('axios');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const exam = req.query.exam;
  const subject = req.query.subject;
  const q = {};
  if (exam) q.exam = exam;
  if (subject) q.subject = subject;
  const list = await QuestionBank.find(q).sort({ createdAt: -1 }).limit(2000);
  res.json(list);
}));

router.post('/import', asyncHandler(async (req, res) => {
  const body = req.body || {};
  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) return res.status(400).json({ error: 'items required' });

  const docs = items.map((q) => ({
    exam: q.exam,
    subject: q.subject,
    class: q.class,
    chapter: q.chapter,
    difficulty: q.difficulty || 'Standard',
    tags: Array.isArray(q.tags) ? q.tags : [],
    text: q.text,
    imageUrl: q.imageUrl,
    options: Array.isArray(q.options) ? q.options : [],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    source: q.source,
  })).filter((q) => q.exam && q.subject && q.text);

  if (docs.length === 0) return res.status(400).json({ error: 'no valid items' });

  const created = await QuestionBank.insertMany(docs, { ordered: false });
  res.status(201).json({ inserted: created.length });
}));

router.post('/generate', asyncHandler(async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(400).json({ error: 'OPENAI_API_KEY is not set on server' });

  const body = req.body || {};
  const exam = String(body.exam || 'NEET').toUpperCase();
  const subject = String(body.subject || '').trim();
  const chapter = body.chapter ? String(body.chapter) : undefined;
  const className = body.class ? String(body.class) : undefined;
  const difficulty = String(body.difficulty || 'Hard');
  const count = Math.max(1, Math.min(parseInt(body.count || '20', 10), 50));
  const diagramRatio = Math.min(Math.max(parseFloat(body.diagramRatio || '0.1'), 0), 0.5);

  if (!subject) return res.status(400).json({ error: 'subject required' });
  if (!['NEET', 'JEE'].includes(exam)) return res.status(400).json({ error: 'exam must be NEET or JEE' });

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const sys = [
    'You are an exam content generator.',
    'Generate original multiple-choice questions similar in style to Indian competitive exams (NEET/JEE) but do not copy from any copyrighted sources.',
    'Return ONLY valid JSON with the specified schema. No markdown. No extra text.'
  ].join(' ');

  const schema = {
    exam: 'NEET|JEE',
    subject: 'Physics|Chemistry|Biology|Mathematics',
    class: 'Class 11|Class 12|optional',
    chapter: 'string|optional',
    difficulty: 'Standard|Medium|Hard',
    tags: ['diagram?'],
    text: 'string',
    imageUrl: null,
    options: [
      { id: 'A', text: '...' },
      { id: 'B', text: '...' },
      { id: 'C', text: '...' },
      { id: 'D', text: '...' }
    ],
    correctAnswer: 'A|B|C|D',
    explanation: 'short explanation'
  };

  const userPrompt = {
    task: 'generate_mcq_dataset',
    exam,
    subject,
    chapter,
    class: className,
    difficulty,
    count,
    diagramRatio,
    output: {
      format: 'json',
      topLevel: { items: 'array' },
      itemSchema: schema,
      rules: [
        'Each question must have exactly 4 options with ids A,B,C,D.',
        'correctAnswer must be one of A,B,C,D and match an option id.',
        'imageUrl must be null (no external image fetching). If diagram-like, set tags include "diagram" and write the question assuming a diagram is provided separately.',
        'Keep questions challenging and calculation/concept heavy where appropriate.',
        'Avoid factual errors and ambiguous wording.'
      ]
    }
  };

  const resp = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model,
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: JSON.stringify(userPrompt) }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 60000
    }
  );

  const content = resp.data?.choices?.[0]?.message?.content;
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    return res.status(502).json({ error: 'OpenAI returned invalid JSON', raw: content?.slice(0, 2000) });
  }

  const items = Array.isArray(parsed?.items) ? parsed.items : [];
  if (items.length === 0) return res.status(502).json({ error: 'No items returned from model' });

  const normalize = (q) => {
    const opts = Array.isArray(q.options) ? q.options : [];
    const optIds = new Set(opts.map((o) => String(o?.id || '').toUpperCase()));
    const correct = String(q.correctAnswer || '').toUpperCase();

    if (!q.text || typeof q.text !== 'string') return null;
    if (opts.length !== 4) return null;
    if (!['A', 'B', 'C', 'D'].every((id) => optIds.has(id))) return null;
    if (!['A', 'B', 'C', 'D'].includes(correct)) return null;

    return {
      exam,
      subject: String(q.subject || subject),
      class: q.class ? String(q.class) : className,
      chapter: q.chapter ? String(q.chapter) : chapter,
      difficulty: String(q.difficulty || difficulty),
      tags: Array.isArray(q.tags) ? q.tags.map(String) : [],
      text: String(q.text),
      imageUrl: q.imageUrl ? String(q.imageUrl) : undefined,
      options: opts.map((o) => ({ id: String(o.id).toUpperCase(), text: String(o.text || '') })),
      correctAnswer: correct,
      explanation: q.explanation ? String(q.explanation) : undefined,
      source: 'openai'
    };
  };

  const docs = items.map(normalize).filter(Boolean);
  if (docs.length === 0) return res.status(400).json({ error: 'Generated items failed validation' });

  const created = await QuestionBank.insertMany(docs, { ordered: false });
  res.status(201).json({ inserted: created.length });
}));

module.exports = router;
