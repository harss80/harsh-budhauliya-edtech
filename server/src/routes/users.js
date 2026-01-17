const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');

const router = express.Router();

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

module.exports = router;
