const express = require('express');
const router = express.Router();
const Office = require('../models/Office');

// Get all offices (optionally filter by serviceId)
router.get('/', async (req, res) => {
  try {
    const { serviceId } = req.query;
    
    let query = {};
    if (serviceId) {
      query.services = serviceId;
    }
    
    const offices = await Office.find(query).sort({ name: 1 });
    
    res.json(offices.map(o => ({
      id: o._id,
      name: o.name,
      nameNepali: o.nameNepali,
      districtId: o.districtId,
      address: o.address,
      phone: o.phone,
      email: o.email,
      hours: o.hours,
      services: o.services,
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
