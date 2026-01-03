const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  labelNepali: { type: String, required: true },
  nextQuestion: { type: String },
  eligible: { type: Boolean },
  reason: { type: String },
}, { _id: false });

const eligibilityQuestionSchema = new mongoose.Schema({
  serviceId: {
  type: String,
  required: true
}
,
  questionId: { type: String, required: true },
  question: { type: String, required: true },
  questionNepali: { type: String, required: true },
  options: [optionSchema],
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

eligibilityQuestionSchema.index({ serviceId: 1, sortOrder: 1 });

module.exports = mongoose.model('EligibilityQuestion', eligibilityQuestionSchema);
