const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  fileName: { type: String },
  mimeType: { type: String },
  size: { type: Number },
  data: { type: Buffer },
}, { _id: false });

const CareerApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  role: { type: String },
  city: { type: String },
  message: { type: String },
  resume: { type: ResumeSchema },
  status: { type: String, enum: ['new', 'viewed'], default: 'new' },
}, { timestamps: true });

module.exports = mongoose.model('CareerApplication', CareerApplicationSchema);
