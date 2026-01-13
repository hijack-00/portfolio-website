const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

// @route   GET /api/skills
// @desc    Get all active skills
// @access  Public
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find({ isActive: true }).sort({ order: 1 });
        res.json(skills);
    } catch (error) {
        console.error('Get skills error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/skills/all
// @desc    Get all skills (including inactive)
// @access  Private (Admin)
router.get('/all', auth, async (req, res) => {
    try {
        const skills = await Skill.find().sort({ order: 1 });
        res.json(skills);
    } catch (error) {
        console.error('Get all skills error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/skills/:id
// @desc    Get single skill
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        res.json(skill);
    } catch (error) {
        console.error('Get skill error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/skills
// @desc    Create new skill
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.status(201).json(skill);
    } catch (error) {
        console.error('Create skill error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        res.json(skill);
    } catch (error) {
        console.error('Update skill error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndDelete(req.params.id);

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error('Delete skill error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
