const mongoose = require('mongoose');

const requiredDocumentSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  docId: { type: String, required: true },
  name: { type: String, required: true },
  nameNepali: { type: String, required: true },
  description: { type: String, required: true },
  required: { type: Boolean, default: true },
  forTypes: [{ type: String }],
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

requiredDocumentSchema.index({ serviceId: 1, sortOrder: 1 });

module.exports = mongoose.model('RequiredDocument', requiredDocumentSchema);
