const express = require('express');
const router = express.Router();
const District = require('../models/District');
const Municipality = require('../models/Municipality');

// Get all districts with municipalities
router.get('/', async (req, res) => {
  try {
    const districts = await District.find().sort({ name: 1 });
    const municipalities = await Municipality.find().sort({ name: 1 });
    
    const result = districts.map(d => ({
      id: d._id,
      name: d.name,
      nameNepali: d.nameNepali,
      province: d.province,
      municipalities: municipalities
        .filter(m => m.districtId === d._id)
        .map(m => ({
          id: m._id,
          name: m.name,
          nameNepali: m.nameNepali,
          type: m.type,
        })),
    }));
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
