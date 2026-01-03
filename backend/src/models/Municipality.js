const mongoose = require('mongoose');

const municipalitySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  districtId: { type: String, required: true },
  name: { type: String, required: true },
  nameNepali: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['metropolitan', 'sub-metropolitan', 'municipality', 'rural'],
    required: true 
  },
}, { timestamps: true });

municipalitySchema.index({ districtId: 1 });

module.exports = mongoose.model('Municipality', municipalitySchema);
