const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

// @route   GET /api/blog
// @desc    Get all published blogs
// @access  Public
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ date: -1 });
        res.json(blogs);
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/blog/all
// @desc    Get all blogs (including unpublished)
// @access  Private (Admin)
router.get('/all', auth, async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);
    } catch (error) {
        console.error('Get all blogs error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/blog/:slug
// @desc    Get single blog by slug
// @access  Public
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.json(blog);
    } catch (error) {
        console.error('Get blog error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/blog
// @desc    Create new blog
// @access  Private (Admin)
router.post('/', auth, async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        console.error('Create blog error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Slug already exists' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/blog/:id
// @desc    Update blog
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.json(blog);
    } catch (error) {
        console.error('Update blog error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Slug already exists' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/blog/:id
// @desc    Delete blog
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
