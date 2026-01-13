const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    whoami: {
        type: String,
        required: true,
        default: 'I\'m Aadil Khan, a versatile IT Consultant and Full-Stack Developer specializing in end-to-end technology solutions. From mobile apps to enterprise web applications, e-commerce to custom software platforms, I deliver comprehensive digital solutions that drive business success.'
    },
    expertise: {
        type: String,
        required: true,
        default: 'My expertise spans Android & iOS app development, static/dynamic/e-commerce website development, WordPress & Shopify customization, backend API development, software solutions, and domain hosting management. I bring a quality-first approach to every project I build.'
    },
    services: {
        type: String,
        required: true,
        default: 'I provide custom web applications, mobile app development, e-commerce solutions, API development, security audits, WordPress/Shopify stores, hosting setup, and complete software development lifecycle management. Whether you need a startup MVP or enterprise-grade application, I\'ve got you covered.'
    },
    mission: {
        type: String,
        required: true,
        default: 'To empower businesses with robust, efficient, and scalable technology solutions. I combine development expertise with modern best practices to build applications that meet business goals and deliver exceptional user experiences.'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);
