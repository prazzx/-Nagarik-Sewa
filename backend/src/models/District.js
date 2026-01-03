const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  nameNepali: { type: String, required: true },
  province: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('District', districtSchema);
