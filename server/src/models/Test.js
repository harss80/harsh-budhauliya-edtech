const { Schema, model } = require('mongoose');

const TestSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, default: 'General' },
  duration: { type: Number, default: 60 },
  scheduledAt: { type: Date },
  published: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = model('Test', TestSchema);
