const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const servicesRoutes = require('./routes/services');
const districtsRoutes = require('./routes/districts');
const officesRoutes = require('./routes/offices');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nagarik_sewa')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/services', servicesRoutes);
app.use('/api/districts', districtsRoutes);
app.use('/api/offices', officesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nagarik Sewa API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
