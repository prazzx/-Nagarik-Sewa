const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const ServiceInfo = require('../models/ServiceInfo');
const EligibilityQuestion = require('../models/EligibilityQuestion');
const RequiredDocument = require('../models/RequiredDocument');
const ProcedureStep = require('../models/ProcedureStep');
const ServiceCost = require('../models/ServiceCost');
const DownloadableForm = require('../models/DownloadableForm');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get service by ID
// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findOne({ _id: req.params.id });  // Changed
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get detailed service info
router.get('/:id/info', async (req, res) => {
  try {
    const service = await Service.findOne({ _id: req.params.id });  // Changed
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    const info = await ServiceInfo.findOne({ serviceId: req.params.id });
    
    res.json({
      id: service._id,
      title: service.title,
      titleNepali: service.titleNepali,
      description: service.description,
      longDescription: info?.longDescription || service.description,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Get eligibility questions for a service
router.get('/:serviceId/eligibility', async (req, res) => {
  try {
   
    const questions = await EligibilityQuestion.find({ 
      serviceId: req.params.serviceId 
    }).sort({ sortOrder: 1 }).lean(); // Add .lean() here!
    
    
    res.json(questions.map(q => ({
      id: q.questionId,
      questionId: q.questionId,
      question: q.question,
      questionNepali: q.questionNepali,
      options: q.options, // Now this will be plain objects
    })));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get required documents for a service
router.get('/:serviceId/documents', async (req, res) => {
  try {
    const documents = await RequiredDocument.find({ 
      serviceId: req.params.serviceId 
    }).sort({ sortOrder: 1 });
    
    res.json(documents.map(d => ({
      id: d.docId,
      docId: d.docId,
      name: d.name,
      nameNepali: d.nameNepali,
      description: d.description,
      required: d.required,
      forTypes: d.forTypes,
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get procedure steps for a service
router.get('/:serviceId/procedures', async (req, res) => {
  try {
    const steps = await ProcedureStep.find({ 
      serviceId: req.params.serviceId 
    }).sort({ sortOrder: 1 });
    
    res.json(steps.map(s => ({
      id: s.stepId,
      stepId: s.stepId,
      title: s.title,
      titleNepali: s.titleNepali,
      description: s.description,
      isOnline: s.isOnline,
      link: s.link,
      tips: s.tips,
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cost and time info for a service
router.get('/:serviceId/cost', async (req, res) => {
  try {
    const cost = await ServiceCost.findOne({ 
      serviceId: req.params.serviceId 
    });
    
    if (!cost) {
      return res.json(null);
    }
    
    res.json({
      fee: cost.fee,
      feeNepali: cost.feeNepali,
      processingTime: cost.processingTime,
      processingTimeNepali: cost.processingTimeNepali,
      notes: cost.notes,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get downloadable forms for a service
router.get('/:serviceId/forms', async (req, res) => {
  try {
    const forms = await DownloadableForm.find({ 
      serviceId: req.params.serviceId 
    }).sort({ sortOrder: 1 });
    
    res.json(forms.map(f => ({
      id: f.formId,
      formId: f.formId,
      name: f.name,
      nameNepali: f.nameNepali,
      description: f.description,
      url: f.url,
      fileType: f.fileType,
      isExternal: f.isExternal,
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
