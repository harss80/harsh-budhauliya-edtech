const { Schema, model } = require('mongoose');

const EducationDetailsSchema = new Schema({
  targetExam: { type: String, default: '' },
  grade: { type: String, default: '' },
  schoolName: { type: String, default: '' },
  city: { type: String, default: '' },
}, { _id: false });

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String, default: '' },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  admissionId: { type: String, index: true },
  joinDate: { type: String },
  lastLogin: { type: String },
  educationDetails: { type: EducationDetailsSchema, default: () => ({}) },
  accessRights: { type: [String], default: [] },
}, { timestamps: true });

module.exports = model('User', UserSchema);
