const { Schema, model } = require('mongoose');

const OptionSchema = new Schema({
  id: { type: String },
  text: { type: String }
}, { _id: false });

const QuestionSchema = new Schema({
  text: { type: String },
  imageUrl: { type: String },
  options: { type: [OptionSchema], default: [] },
  correctAnswer: { type: String },
  explanation: { type: String },
  subject: { type: String },
  chapter: { type: String },
  difficulty: { type: String }
}, { _id: false });

const TestSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, default: 'General' },
  duration: { type: Number, default: 60 },
  scheduledAt: { type: Date },
  published: { type: Boolean, default: false },
  visibleFrom: { type: Date },
  visibleUntil: { type: Date },
  generated: { type: Boolean, default: false },
  sourceName: { type: String },
  sourceSummary: { type: String },
  questions: { type: [QuestionSchema], default: [] }
}, { timestamps: true });

module.exports = model('Test', TestSchema);
