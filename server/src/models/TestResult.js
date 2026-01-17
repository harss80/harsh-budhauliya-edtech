const { Schema, model, Types } = require('mongoose');

const SubjectStatSchema = new Schema({
  subject: String,
  score: Number,
  max: Number,
  accuracy: Number,
  time: String,
}, { _id: false });

const TestResultSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String },
  attempted: Number,
  correct: Number,
  wrong: Number,
  score: Number,
  maxScore: Number,
  accuracy: Number,
  timeSpent: String,
  subjectAnalysis: { type: [SubjectStatSchema], default: [] },
}, { timestamps: true });

module.exports = model('TestResult', TestResultSchema);
