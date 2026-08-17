const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dns = require('dns');

// Fix Windows DNS querySrv issues for MongoDB Atlas
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn("Could not set custom DNS servers:", e.message);
}

const app = express();

// Import config
const { mongoDBURL } = require('./config/config');

// Middleware to parse incoming JSON
app.use(express.json());

// Enable CORS for frontend dev server (Vite defaults to port 5173, 5174, etc.)
app.use(cors({ origin: true, credentials: true }));

// Connect to MongoDB
mongoose.connect(mongoDBURL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection failed:', err.message));

// 1. Import your custom auth router
const authRoutes = require('./routes/auth')
const applicationsRoutes = require('./routes/applications')
const universitiesRoutes = require('./routes/universities')

// 2. Link the routers to specific URL paths
app.use('/api/auth', authRoutes)
app.use('/api/applications', applicationsRoutes)
app.use('/api/universities', universitiesRoutes)

// Use port 5000 for API server (frontend fetches http://localhost:5000)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})