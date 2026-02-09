const { Schema, model } = require('mongoose');

const OptionSchema = new Schema({
  id: { type: String },
  text: { type: String }
}, { _id: false });

const QuestionBankSchema = new Schema({
  exam: { type: String, required: true, index: true },
  subject: { type: String, required: true, index: true },
  class: { type: String },
  chapter: { type: String },
  difficulty: { type: String, default: 'Standard', index: true },
  tags: { type: [String], default: [], index: true },
  text: { type: String, required: true },
  imageUrl: { type: String },
  options: { type: [OptionSchema], default: [] },
  correctAnswer: { type: String },
  explanation: { type: String },
  source: { type: String },
}, { timestamps: true });

QuestionBankSchema.index({ exam: 1, subject: 1, chapter: 1 });

module.exports = model('QuestionBank', QuestionBankSchema);
