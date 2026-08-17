const express = require('express');
const mongoose = require('mongoose');
const Application = require('../models/applicationModel');
const { verifyToken } = require('./auth');

const router = express.Router();

// GET /api/applications - list current user's applications
router.get('/', verifyToken, async (req, res) => {
    try {
        const applications = await Application.find({ user: req.userId }).sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Could not load applications', error: error.message });
    }
});

// GET /api/applications/:id - get a single application
router.get('/:id', verifyToken, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid application ID format' });
        }

        const application = await Application.findOne({ _id: req.params.id, user: req.userId });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Could not load application', error: error.message });
    }
});

// POST /api/applications - create a new application for the current user
router.post('/', verifyToken, async (req, res) => {
    try {
        const { universityName, country, program, type, status, deadline, semester, notes, checklist, flag, programs, progress } = req.body;

        if (!universityName || !universityName.trim()) {
            return res.status(400).json({ message: 'University name is required' });
        }

        const existing = await Application.findOne({
            user: req.userId,
            universityName: universityName.trim(),
            program: program || '',
            semester: semester || '',
        });

        if (existing) {
            return res.status(400).json({ message: 'You already have this application saved.' });
        }

        const application = new Application({
            user: req.userId,
            universityName: universityName.trim(),
            country: country || '',
            program: program || '',
            type: type || 'Exchange',
            status: status || 'Planned',
            deadline: deadline || '',
            semester: semester || '',
            notes: notes || '',
            checklist: checklist || {},
            flag: flag || '🎓',
            programs: Array.isArray(programs) ? programs : [],
            progress: typeof progress === 'number' ? progress : 0,
        });

        await application.save();
        res.status(201).json(application);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'This application is already saved for your account.' });
        }
        res.status(500).json({ message: 'Could not save application', error: error.message });
    }
});

// PUT /api/applications/:id - update an application and ensure it belongs to the current user
router.put('/:id', verifyToken, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid application ID format' });
        }

        const { universityName, country, program, type, status, deadline, semester, notes, checklist, flag, programs, progress } = req.body;

        const application = await Application.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            {
                universityName,
                country,
                program,
                type,
                status,
                deadline,
                semester,
                notes,
                checklist,
                flag,
                programs,
                progress
            },
            { returnDocument: 'after', runValidators: true }
        );

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Could not update application', error: error.message });
    }
});

// DELETE /api/applications/:id - remove an application from the current user's list
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid application ID format' });
        }

        const application = await Application.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json({ message: 'Application removed' });
    } catch (error) {
        res.status(500).json({ message: 'Could not delete application', error: error.message });
    }
});

module.exports = router;
