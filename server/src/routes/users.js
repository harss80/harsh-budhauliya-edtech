const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

const router = express.Router();

const requireAdminToken = (req, res, next) => {
  const expected = process.env.ADMIN_ACCESS_TOKEN;
  if (!expected) {
    return res.status(500).json({ error: 'ADMIN_ACCESS_TOKEN is not set on server' });
  }
  const provided = String(req.headers['x-admin-token'] || req.query.token || '');
  if (!provided || provided !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
};

// Legacy endpoint used by Login.jsx
router.post('/', asyncHandler(async (req, res) => {
  const { email, name, phone, educationDetails, role, admissionId, joinDate, lastLogin, accessRights } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email required' });
  const update = {
    name: name || 'Student',
    phone: phone || '',
    role: role || 'student',
    educationDetails: educationDetails || {},
    admissionId,
    joinDate,
    lastLogin,
    accessRights: Array.isArray(accessRights) ? accessRights : undefined,
  };
  const user = await User.findOneAndUpdate({ email }, { $set: update }, { upsert: true, new: true, setDefaultsOnInsert: true });
  res.json(user);
}));

// Basic list
router.get('/', asyncHandler(async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 }).limit(500);
  res.json(users);
}));

// Token-protected admin list (search + pagination)
router.get('/admin', requireAdminToken, asyncHandler(async (req, res) => {
  const q = String(req.query.q || '').trim();
  const exam = String(req.query.exam || '').trim();
  const page = Math.max(parseInt(req.query.page || '1', 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || '50', 10) || 50, 1), 200);

  const query = {};

  if (exam) {
    query['educationDetails.targetExam'] = { $regex: exam, $options: 'i' };
  }

  if (q) {
    query.$or = [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
      { admissionId: { $regex: q, $options: 'i' } },
      { phone: { $regex: q, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(query),
  ]);

  res.json({
    items,
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  });
}));

module.exports = router;
