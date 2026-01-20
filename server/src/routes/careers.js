const express = require('express');
const multer = require('multer');
const CareerApplication = require('../models/CareerApplication');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// List applications (sanitized)
router.get('/', async (req, res, next) => {
  try {
    const list = await CareerApplication.find({}, {
      name: 1,
      email: 1,
      phone: 1,
      role: 1,
      city: 1,
      message: 1,
      status: 1,
      createdAt: 1,
      'resume.fileName': 1,
      'resume.mimeType': 1,
      'resume.size': 1,
    }).sort({ createdAt: -1 }).lean();

    const mapped = list.map((x) => ({
      id: x._id,
      name: x.name,
      email: x.email,
      phone: x.phone,
      role: x.role,
      city: x.city,
      message: x.message,
      status: x.status,
      createdAt: x.createdAt,
      resume: x.resume || null,
    }));

    res.json(mapped);
  } catch (e) { next(e); }
});

// Submit application
router.post('/apply', upload.single('resume'), async (req, res, next) => {
  try {
    const { name, email, phone, role, city, message } = req.body || {};
    if (!name || !email) return res.status(400).json({ error: 'name and email are required' });

    let resume = undefined;
    if (req.file) {
      const allowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowed.includes(req.file.mimetype)) {
        return res.status(400).json({ error: 'Only PDF or DOC/DOCX allowed' });
      }
      resume = {
        fileName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        data: req.file.buffer,
      };
    }

    const doc = await CareerApplication.create({ name, email, phone, role, city, message, resume });
    res.json({ id: doc._id, ok: true });
  } catch (e) { next(e); }
});

// Update application (e.g., mark viewed)
router.patch('/:id', async (req, res, next) => {
  try {
    const { status } = req.body || {};
    const allowed = ['new', 'viewed'];
    const update = {};
    if (status && allowed.includes(status)) update.status = status;
    const doc = await CareerApplication.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Download resume
router.get('/:id/resume', async (req, res, next) => {
  try {
    const doc = await CareerApplication.findById(req.params.id);
    if (!doc || !doc.resume || !doc.resume.data) return res.status(404).json({ error: 'Not found' });

    res.setHeader('Content-Type', doc.resume.mimeType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(doc.resume.fileName || 'resume')}"`);
    return res.send(doc.resume.data);
  } catch (e) { next(e); }
});

module.exports = router;
