const express = require('express');
const router = express.Router();
const About = require('../models/About');
const auth = require('../middleware/auth');

// @route   GET /api/about
// @desc    Get about content
// @access  Public
router.get('/', async (req, res) => {
    try {
        let about = await About.findOne();

        if (!about) {
            about = new About();
            await about.save();
        }

        res.json(about);
    } catch (error) {
        console.error('Get about error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/about
// @desc    Update about content
// @access  Private (Admin)
router.put('/', auth, async (req, res) => {
    try {
        const updateData = req.body;

        let about = await About.findOne();

        if (!about) {
            about = new About(updateData);
        } else {
            Object.assign(about, updateData);
        }

        await about.save();
        res.json(about);
    } catch (error) {
        console.error('Update about error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
