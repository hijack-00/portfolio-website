require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Admin model
const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

async function createAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@portfolio.com' });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash('Admin@12345', 10);

        // Create admin user
        const admin = new Admin({
            name: 'Admin',
            email: 'admin@portfolio.com',
            password: hashedPassword
        });

        await admin.save();
        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@portfolio.com');
        console.log('Password: Admin@12345');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();
