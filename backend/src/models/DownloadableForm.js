const mongoose = require('mongoose');

const downloadableFormSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  formId: { type: String, required: true },
  name: { type: String, required: true },
  nameNepali: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  fileType: { type: String, enum: ['pdf', 'doc', 'online'], required: true },
  isExternal: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

downloadableFormSchema.index({ serviceId: 1, sortOrder: 1 });

module.exports = mongoose.model('DownloadableForm', downloadableFormSchema);
