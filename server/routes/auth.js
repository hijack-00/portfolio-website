const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt:', { email, password });

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check if admin exists
        const admin = await Admin.findOne({ email: email.toLowerCase() });

        console.log('Admin found:', admin ? 'Yes' : 'No');

        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Validate password
        const isMatch = await admin.comparePassword(password);

        console.log('Password match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Update last login
        admin.lastLogin = new Date();
        await admin.save();

        // Create JWT token
        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                name: admin.name,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/auth/init
// @desc    Initialize admin account (only if no admin exists)
// @access  Public
router.post('/init', async (req, res) => {
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne();

        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create default admin
        const admin = new Admin({
            email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
            password: process.env.ADMIN_PASSWORD || 'Admin@12345',
            name: 'Admin'
        });

        await admin.save();

        res.json({ message: 'Admin account created successfully' });
    } catch (error) {
        console.error('Init error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/auth/reset
// @desc    Delete all admins (for debugging)
// @access  Public
router.delete('/reset', async (req, res) => {
    try {
        await Admin.deleteMany({});
        res.json({ message: 'All admin accounts deleted' });
    } catch (error) {
        console.error('Reset error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/auth/check
// @desc    Check if admin exists
// @access  Public
router.get('/check', async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.json({
            count: admins.length,
            admins: admins.map(a => ({ email: a.email, name: a.name }))
        });
    } catch (error) {
        console.error('Check error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
