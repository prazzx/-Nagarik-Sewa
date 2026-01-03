const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  titleNepali: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'FileText' },
  category: { type: String, required: true },
  available: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
