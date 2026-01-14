const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');

// @route   GET /api/profile
// @desc    Get profile
// @access  Public
router.get('/', async (req, res) => {
    try {
        let profile = await Profile.findOne();

        if (!profile) {
            // Return null instead of creating empty profile
            return res.json(null);
        }

        res.json(profile);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/profile
// @desc    Update profile
// @access  Private (Admin)
router.put('/', auth, async (req, res) => {
    try {
        const updateData = req.body;

        let profile = await Profile.findOne();

        if (!profile) {
            profile = new Profile(updateData);
        } else {
            Object.assign(profile, updateData);
        }

        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
