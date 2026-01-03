const mongoose = require('mongoose');

const serviceCostSchema = new mongoose.Schema({
  serviceId: { type: String, required: true, unique: true },
  fee: { type: String, required: true },
  feeNepali: { type: String, required: true },
  processingTime: { type: String, required: true },
  processingTimeNepali: { type: String, required: true },
  notes: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('ServiceCost', serviceCostSchema);
