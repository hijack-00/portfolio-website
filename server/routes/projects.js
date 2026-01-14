const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadToR2, deleteFromR2 } = require('../config/cloudflare');

// @route   GET /api/projects
// @desc    Get all active projects
// @access  Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({ isActive: true }).sort({ order: 1 });
        res.json(projects);
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/projects/all
// @desc    Get all projects (including inactive)
// @access  Private (Admin)
router.get('/all', auth, async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1 });
        res.json(projects);
    } catch (error) {
        console.error('Get all projects error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (Admin)
router.post('/', auth, upload.single('screenshot'), async (req, res) => {
    try {
        const projectData = req.body;

        // Handle tech array (might come as string from form)
        if (typeof projectData.tech === 'string') {
            projectData.tech = projectData.tech.split(',').map(t => t.trim()).filter(t => t);
        }

        // Handle features array (might come as string from form)
        if (typeof projectData.features === 'string') {
            projectData.features = projectData.features.split(',').map(f => f.trim()).filter(f => f);
        }

        // Upload screenshot if provided
        if (req.file) {
            const screenshotUrl = await uploadToR2(req.file, 'screenshots');
            projectData.screenshot = screenshotUrl;
        }

        const project = new Project(projectData);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin)
router.put('/:id', auth, upload.single('screenshot'), async (req, res) => {
    try {
        const projectData = req.body;

        // Handle tech array
        if (typeof projectData.tech === 'string') {
            projectData.tech = projectData.tech.split(',').map(t => t.trim()).filter(t => t);
        }

        // Handle features array
        if (typeof projectData.features === 'string') {
            projectData.features = projectData.features.split(',').map(f => f.trim()).filter(f => f);
        }

        // Find existing project
        const existingProject = await Project.findById(req.params.id);
        if (!existingProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Upload new screenshot if provided
        if (req.file) {
            // Delete old screenshot if exists
            if (existingProject.screenshot) {
                try {
                    await deleteFromR2(existingProject.screenshot);
                } catch (err) {
                    console.error('Error deleting old screenshot:', err);
                }
            }

            const screenshotUrl = await uploadToR2(req.file, 'screenshots');
            projectData.screenshot = screenshotUrl;
        }

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            projectData,
            { new: true, runValidators: true }
        );

        res.json(project);
    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Delete screenshot if exists
        if (project.screenshot) {
            try {
                await deleteFromR2(project.screenshot);
            } catch (err) {
                console.error('Error deleting screenshot:', err);
            }
        }

        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
