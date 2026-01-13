const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');
const auth = require('../middleware/auth');

// @route   GET /api/certifications
// @desc    Get all active certifications
// @access  Public
router.get('/', async (req, res) => {
    try {
        const certifications = await Certification.find({ isActive: true }).sort({ order: 1 });
        res.json(certifications);
    } catch (error) {
        console.error('Get certifications error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/certifications/all
// @desc    Get all certifications (including inactive)
// @access  Private (Admin)
router.get('/all', auth, async (req, res) => {
    try {
        const certifications = await Certification.find().sort({ order: 1 });
        res.json(certifications);
    } catch (error) {
        console.error('Get all certifications error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/certifications/:id
// @desc    Get single certification
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);

        if (!certification) {
            return res.status(404).json({ message: 'Certification not found' });
        }

        res.json(certification);
    } catch (error) {
        console.error('Get certification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/certifications
// @desc    Create new certification
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
    try {
        const certData = req.body;

        // Handle topics array
        if (typeof certData.topics === 'string') {
            certData.topics = certData.topics.split(',').map(t => t.trim());
        }

        const certification = new Certification(certData);
        await certification.save();
        res.status(201).json(certification);
    } catch (error) {
        console.error('Create certification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/certifications/:id
// @desc    Update certification
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
    try {
        const certData = req.body;

        // Handle topics array
        if (typeof certData.topics === 'string') {
            certData.topics = certData.topics.split(',').map(t => t.trim());
        }

        const certification = await Certification.findByIdAndUpdate(
            req.params.id,
            certData,
            { new: true, runValidators: true }
        );

        if (!certification) {
            return res.status(404).json({ message: 'Certification not found' });
        }

        res.json(certification);
    } catch (error) {
        console.error('Update certification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/certifications/:id
// @desc    Delete certification
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const certification = await Certification.findByIdAndDelete(req.params.id);

        if (!certification) {
            return res.status(404).json({ message: 'Certification not found' });
        }

        res.json({ message: 'Certification deleted successfully' });
    } catch (error) {
        console.error('Delete certification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
