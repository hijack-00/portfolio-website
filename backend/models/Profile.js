const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Aadil Khan'
    },
    title: {
        type: String,
        required: true,
        default: 'IT Consultant • Full-Stack Developer'
    },
    subtitle: {
        type: String,
        default: 'IT Consultant • Full-Stack Developer • Software Solutions Expert'
    },
    typingTexts: [{
        type: String
    }],
    email: {
        type: String,
        required: true
    },
    githubUrl: {
        type: String
    },
    linkedinUrl: {
        type: String
    },
    resumeUrl: {
        type: String,
        default: '/resume.html'
    },
    footerText: {
        type: String,
        default: '© 2024 Aadil Khan | IT Consultant • Developer • Ethical Hacker'
    },
    footerTagline: {
        type: String,
        default: '"Building secure, scalable solutions for the digital world."'
    },
    availability: {
        type: String,
        default: 'Available for web/app development projects, e-commerce solutions, WordPress/Shopify customization, API development, security audits, and IT consulting services.'
    },
    responseTime: {
        type: String,
        default: 'Response time: 24-48 hours'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
