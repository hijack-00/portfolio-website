const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');
const auth = require('../middleware/auth');

// @route   GET /api/tools
// @desc    Get all active tools
// @access  Public
router.get('/', async (req, res) => {
    try {
        const tools = await Tool.find({ isActive: true }).sort({ order: 1 });
        res.json(tools);
    } catch (error) {
        console.error('Get tools error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/tools/all
// @desc    Get all tools (including inactive)
// @access  Private (Admin)
router.get('/all', auth, async (req, res) => {
    try {
        const tools = await Tool.find().sort({ order: 1 });
        res.json(tools);
    } catch (error) {
        console.error('Get all tools error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/tools/:id
// @desc    Get single tool
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.id);

        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }

        res.json(tool);
    } catch (error) {
        console.error('Get tool error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/tools
// @desc    Create new tool
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
    try {
        const tool = new Tool(req.body);
        await tool.save();
        res.status(201).json(tool);
    } catch (error) {
        console.error('Create tool error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/tools/:id
// @desc    Update tool
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
    try {
        const tool = await Tool.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }

        res.json(tool);
    } catch (error) {
        console.error('Update tool error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/tools/:id
// @desc    Delete tool
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const tool = await Tool.findByIdAndDelete(req.params.id);

        if (!tool) {
            return res.status(404).json({ message: 'Tool not found' });
        }

        res.json({ message: 'Tool deleted successfully' });
    } catch (error) {
        console.error('Delete tool error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
