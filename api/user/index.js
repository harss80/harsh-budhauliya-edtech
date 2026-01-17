import dbConnect from '../_lib/db.js';
import User from '../_models/User.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    await dbConnect();
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
  } catch {
    res.status(500).json({ error: 'server error' });
  }
}
