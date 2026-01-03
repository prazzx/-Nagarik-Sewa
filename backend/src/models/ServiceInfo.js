const mongoose = require('mongoose');

const serviceInfoSchema = new mongoose.Schema({
  serviceId: { type: String, required: true, unique: true },
  longDescription: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ServiceInfo', serviceInfoSchema);
