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
