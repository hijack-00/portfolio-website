const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: 'Message received successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private (Admin)
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/contact/:id
// @desc    Get single contact message
// @access  Private (Admin)
router.get('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Mark as read
        if (!contact.isRead) {
            contact.isRead = true;
            await contact.save();
        }

        res.json(contact);
    } catch (error) {
        console.error('Get contact error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact message status
// @access  Private (Admin)
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status, isRead } = req.body;

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status, isRead },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json(contact);
    } catch (error) {
        console.error('Update contact status error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact message
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Delete contact error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
