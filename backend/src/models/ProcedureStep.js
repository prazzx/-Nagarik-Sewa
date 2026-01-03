const mongoose = require('mongoose');

const procedureStepSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  stepId: { type: String, required: true },
  title: { type: String, required: true },
  titleNepali: { type: String, required: true },
  description: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
  link: { type: String },
  tips: [{ type: String }],
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

procedureStepSchema.index({ serviceId: 1, sortOrder: 1 });

module.exports = mongoose.model('ProcedureStep', procedureStepSchema);
