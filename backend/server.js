const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Import config
const { mongoDBURL } = require('./config/config');

// Middleware to parse incoming JSON
app.use(express.json());

// Enable CORS for frontend dev server (Vite defaults to port 5173)
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));

// Connect to MongoDB
mongoose.connect(mongoDBURL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection failed:', err.message));

// 1. Import your custom auth router
const authRoutes = require('./routes/auth');

// 2. Link the router to a specific URL path
// This means all routes inside auth.js will automatically start with /api/auth
app.use('/api/auth', authRoutes);

// Example: Your URLs are now http://localhost:3000/api/auth/register
// and http://localhost:3000/api/auth/login

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});