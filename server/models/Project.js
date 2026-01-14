const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // Detailed description for project details page
    longDescription: {
        type: String,
        default: ''
    },
    tech: [{
        type: String
    }],
    github: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    linkType: {
        type: String,
        enum: ['website', 'apk'],
        default: 'website'
    },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Development', 'Beta', 'Deployed', 'Maintained'],
        required: true
    },
    screenshot: {
        type: String
    },
    // Additional screenshots for details page
    additionalScreenshots: [{
        type: String
    }],
    // Detailed project information
    workDone: {
        type: String,
        default: ''
    },
    duration: {
        type: String,
        default: ''
    },
    completionTime: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: ''
    },
    client: {
        type: String,
        default: ''
    },
    teamSize: {
        type: String,
        default: ''
    },
    challenges: {
        type: String,
        default: ''
    },
    learnings: {
        type: String,
        default: ''
    },
    features: [{
        type: String
    }],
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
