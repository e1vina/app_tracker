const express = require('express')
const router = express.Router()
const University = require('../models/University')

// GET /api/universities - return all universities
router.get('/', async (req, res) => {
    try {
        const universities = await University.find().sort({ match: -1 })
        return res.json(universities)
    } catch (err) {
        console.error('Error fetching universities:', err.message)
        return res.status(500).json({ error: 'Unable to fetch universities' })
    }
})

module.exports = router
