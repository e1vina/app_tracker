const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel');

// Create an instance of the Express Router
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_123";

// --- REGISTER ROUTE ---
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, homeUniversity } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedUsername = username.trim();

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ username: trimmedUsername }, { email: trimmedEmail }]
        });
        
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email or username" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: trimmedUsername,
            email: trimmedEmail,
            password: hashedPassword,
            firstName: firstName ? firstName.trim() : "",
            lastName: lastName ? lastName.trim() : "",
            homeUniversity: homeUniversity ? homeUniversity.trim() : "",
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Something went wrong during registration", error: error.message });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username/email and password are required" });
        }

        const inputTarget = username.trim().toLowerCase();

        const user = await User.findOne({
            $or: [{ username: username.trim() }, { email: inputTarget }]
        });

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
        console.error("Login error:", error);
        res.status(500).json({ message: "Something went wrong during login", error: error.message });
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
        if (!decoded.userId || !mongoose.Types.ObjectId.isValid(decoded.userId)) {
            return res.status(401).json({ message: "Invalid token payload" });
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
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
        console.error("Profile fetch error:", error);
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
                firstName: firstName ? firstName.trim() : "",
                lastName: lastName ? lastName.trim() : "",
                homeUniversity: homeUniversity ? homeUniversity.trim() : "",
                gpa: gpa || "",
                studyYear: studyYear || "Year 1",
                targetSemester: targetSemester || "Spring 2026",
                languages: languages || "",
            },
            { returnDocument: 'after', runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Profile updated successfully!", user });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

module.exports = router;
module.exports.verifyToken = verifyToken;