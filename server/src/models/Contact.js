const { Schema, model } = require('mongoose');

const ContactSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  queryType: { type: String, default: 'General' },
  message: String,
  status: { type: String, enum: ['open', 'resolved'], default: 'open' },
  resolvedAt: { type: Date },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = model('Contact', ContactSchema);
