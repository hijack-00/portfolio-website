const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true,
        default: 'ri-code-line'
    },
    status: {
        type: String,
        enum: ['Beginner', 'Proficient', 'Advanced', 'Expert'],
        required: true
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

module.exports = mongoose.model('Tool', toolSchema);
