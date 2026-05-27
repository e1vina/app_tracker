const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Create an instance of the Express Router
const router = express.Router();

const JWT_SECRET = "super_secret_key_123";

// --- REGISTER ROUTE ---
// Note: The path is just '/' now because 'auth' will be prefixed in server.js
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, homeUniversity } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            homeUniversity,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ $or: [{ username }, { email: username }] });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: "Login successful!", token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// --- GET USER PROFILE ROUTE ---
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

// --- UPDATE USER PROFILE ROUTE ---
router.put('/profile', verifyToken, async (req, res) => {
    try {
        const { firstName, lastName, homeUniversity, gpa, studyYear, targetSemester, languages } = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            {
                firstName,
                lastName,
                homeUniversity,
                gpa,
                studyYear,
                targetSemester,
                languages,
            },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Profile updated successfully!", user });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

// CRUCIAL: Export the router so server.js can import it
module.exports = router;