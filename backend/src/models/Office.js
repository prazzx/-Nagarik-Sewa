const mongoose = require('mongoose');

const officeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  nameNepali: { type: String, required: true },
  districtId: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  hours: { type: String, required: true },
  services: [{ type: String }],
}, { timestamps: true });

officeSchema.index({ districtId: 1 });
officeSchema.index({ services: 1 });

module.exports = mongoose.model('Office', officeSchema);
