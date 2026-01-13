require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const About = require('../models/About');
const Skill = require('../models/Skill');
const Tool = require('../models/Tool');
const Project = require('../models/Project');
const Certification = require('../models/Certification');
const Blog = require('../models/Blog');
const Admin = require('../models/Admin');

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Clear existing data
        await Profile.deleteMany({});
        await About.deleteMany({});
        await Skill.deleteMany({});
        await Tool.deleteMany({});
        await Project.deleteMany({});
        await Certification.deleteMany({});
        await Blog.deleteMany({});
        await Admin.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create Profile
        await Profile.create({
            name: 'Aadil Khan',
            title: 'IT Consultant',
            subtitle: 'Full-Stack Developer',
            typingTexts: [
                'Initializing systems...',
                'Access granted...',
                'Welcome to the digital workspace of Aadil Khan.',
                'IT Consultant • Full-Stack Developer',
                'Building innovative solutions...'
            ],
            email: 'khanaadil8299@gmail.com',
            phone: '+91 XXXXXXXXXX',
            githubUrl: 'https://github.com/hijack-00',
            linkedinUrl: 'https://linkedin.com/in/aadil-khan',
            resumeUrl: '/resume.html',
            footerText: 'Built with passion by Aadil Khan',
            footerTagline: 'Empowering businesses through technology',
            availability: 'Available for freelance projects',
            responseTime: 'Usually responds within 24 hours'
        });

        // Create About
        await About.create({
            whoami: "I'm Aadil Khan, a versatile IT Consultant and Full-Stack Developer specializing in end-to-end technology solutions. From mobile apps to enterprise web applications, e-commerce to custom software platforms, I deliver comprehensive digital solutions that drive business success.",
            expertise: "My expertise spans Android & iOS app development, static/dynamic/e-commerce website development, WordPress & Shopify customization, backend API development, software solutions, and domain hosting management. I bring a quality-first approach to every project I build.",
            services: "I provide custom web applications, mobile app development, e-commerce solutions, API development, security audits, WordPress/Shopify stores, hosting setup, and complete software development lifecycle management. Whether you need a startup MVP or enterprise-grade application, I've got you covered.",
            mission: "To empower businesses with robust, efficient, and scalable technology solutions. I combine development expertise with modern best practices to build applications that meet business goals and deliver exceptional user experiences."
        });

        // Create Skills
        const skills = [
            { name: 'Web Development', level: 'Expert', progress: 95, order: 1 },
            { name: 'App Development (Android/iOS)', level: 'Advanced', progress: 90, order: 2 },
            { name: 'Backend/API Development', level: 'Expert', progress: 92, order: 3 },
            { name: 'WordPress/Shopify', level: 'Advanced', progress: 88, order: 4 },
            { name: 'E-commerce Solutions', level: 'Advanced', progress: 85, order: 5 },
            { name: 'Software Architecture', level: 'Advanced', progress: 87, order: 6 },
            { name: 'Database Management', level: 'Expert', progress: 90, order: 7 },
            { name: 'Cloud & Hosting', level: 'Advanced', progress: 85, order: 8 },
            { name: 'UI/UX Design', level: 'Intermediate', progress: 75, order: 9 },
            { name: 'Version Control (Git)', level: 'Expert', progress: 93, order: 10 },
            { name: 'DevOps & Deployment', level: 'Advanced', progress: 82, order: 11 }
        ];
        await Skill.insertMany(skills);

        // Create Tools
        const tools = [
            { name: 'React/Next.js', icon: 'ri-reactjs-line', status: 'Expert', order: 1 },
            { name: 'Flutter/React Native', icon: 'ri-smartphone-line', status: 'Advanced', order: 2 },
            { name: 'Node.js/Express', icon: 'ri-code-s-slash-line', status: 'Expert', order: 3 },
            { name: 'WordPress', icon: 'ri-wordpress-line', status: 'Expert', order: 4 },
            { name: 'Shopify', icon: 'ri-shopping-bag-line', status: 'Advanced', order: 5 },
            { name: 'MongoDB/MySQL', icon: 'ri-database-2-line', status: 'Expert', order: 6 },
            { name: 'Git/GitHub', icon: 'ri-git-branch-line', status: 'Expert', order: 7 },
            { name: 'Banner/Logo Design', icon: 'ri-palette-line', status: 'Proficient', order: 8 },
            { name: 'Postman/APIs', icon: 'ri-file-code-line', status: 'Expert', order: 9 }
        ];
        await Tool.insertMany(tools);

        console.log('✅ Profile, About, Skills, and Tools created');

        // Projects will be added in next part due to size
        console.log('⏳ Adding projects...');

        const projects = [
            {
                title: '3D Mockup Backend',
                description: 'Backend API service for 3D model customization and mockup generation with real-time processing capabilities.',
                tech: ['Node.js', 'Express', 'MongoDB', 'WebSocket'],
                github: 'https://github.com/hijack-00/3dMockupBackend',
                link: '#',
                linkType: 'website',
                status: 'Active',
                screenshot: '/screenshots/3d-mockup-backend.png',
                order: 1
            },
            {
                title: '3D Model Web',
                description: 'Interactive 3D model viewer and editor built with Three.js for web-based 3D content manipulation.',
                tech: ['Three.js', 'React', 'WebGL', 'TypeScript'],
                github: 'https://github.com/hijack-00/3dModelWeb',
                link: '#',
                linkType: 'website',
                status: 'Completed',
                screenshot: '/screenshots/3d-model-web.png',
                order: 2
            },
            {
                title: 'Anibhavi Creation',
                description: 'B2B e-commerce platform for jeans manufacturing with bulk ordering and business workflow management.',
                tech: ['Flutter', 'Firebase', 'Node.js', 'MongoDB'],
                github: 'https://github.com/hijack-00/anibhaviCreation',
                link: '/apk/anibhavi-creation.apk',
                linkType: 'apk',
                status: 'Active',
                screenshot: '/screenshots/anibhavi-creation.png',
                order: 3
            },
            {
                title: 'Anibhavi Admin',
                description: 'Comprehensive admin panel for managing orders, inventory, users, and business operations.',
                tech: ['Flutter', 'Firebase', 'Charts', 'PDF'],
                github: 'https://github.com/hijack-00/anibahviadmin',
                link: '/apk/anibhavi-admin.apk',
                linkType: 'apk',
                status: 'Active',
                screenshot: '/screenshots/anibhavi-admin.png',
                order: 4
            },
            {
                title: 'Portfolio Live',
                description: 'Live production portfolio website with modern design and interactive elements.',
                tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
                github: 'https://github.com/hijack-00/portfolio-live',
                link: 'https://aadil.chillingon.com',
                linkType: 'website',
                status: 'Deployed',
                screenshot: '/screenshots/portfolio-live.png',
                order: 5
            },
            {
                title: 'Portfolio Website',
                description: 'Personal portfolio website with cyber theme, animations, and contact form integration.',
                tech: ['Next.js', 'React', 'EmailJS', 'Particles.js'],
                github: 'https://github.com/hijack-00/portfolio-website',
                link: 'https://aadil.chillingon.com',
                linkType: 'website',
                status: 'Active',
                screenshot: '/screenshots/portfolio-website.png',
                order: 6
            },
            {
                title: '3D Mockup App for Clothing',
                description: 'Mobile application for visualizing custom clothing designs in 3D with AR capabilities.',
                tech: ['Flutter', 'ARCore', 'Three.js', 'Firebase'],
                github: 'https://github.com/devopsamman/3DMockupapp-For-Clothing-',
                link: '/apk/3d-mockup-clothing.apk',
                linkType: 'apk',
                status: 'Development',
                screenshot: '/screenshots/3d-mockup-clothing.png',
                order: 7
            },
            {
                title: 'Speed X Agrotech',
                description: 'Agricultural technology platform connecting farmers with modern farming solutions and resources.',
                tech: ['React', 'Node.js', 'MongoDB', 'Maps API'],
                github: 'https://github.com/hijack-00/speedxagrotech',
                link: '#',
                linkType: 'website',
                status: 'Completed',
                screenshot: '/screenshots/speedx-agrotech.png',
                order: 8
            },
            {
                title: 'Study Junction',
                description: 'Educational platform providing study materials, courses, and interactive learning experiences.',
                tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe'],
                github: 'https://github.com/hijack-00/studyjunction',
                link: '#',
                linkType: 'website',
                status: 'Active',
                screenshot: '/screenshots/study-junction.png',
                order: 9
            },
            {
                title: 'Listify',
                description: 'Service booking and discovery platform for finding and scheduling local services.',
                tech: ['Flutter', 'Laravel', 'MySQL', 'Google Maps'],
                github: 'https://github.com/hijack-00/listify',
                link: '/apk/listify.apk',
                linkType: 'apk',
                status: 'Deployed',
                screenshot: '/screenshots/listify.png',
                order: 10
            },
            {
                title: 'Kyuon Social Media',
                description: 'Instagram-like social media application with feeds, stories, and real-time messaging.',
                tech: ['Flutter', 'Firebase', 'Cloud Functions', 'FCM'],
                github: 'https://github.com/devopsamman/Kyuon-social-media-app',
                link: '/apk/kyuon.apk',
                linkType: 'apk',
                status: 'Beta',
                screenshot: '/screenshots/kyuon.png',
                order: 11
            },
            {
                title: '3D Model Live Web',
                description: 'Live web platform for real-time 3D model visualization and collaborative editing.',
                tech: ['React', 'Three.js', 'WebGL', 'Socket.io'],
                github: 'https://github.com/hijack-00/3dmodelLiveWeb',
                link: '#',
                linkType: 'website',
                status: 'Active',
                screenshot: '/screenshots/3d-model-live.png',
                order: 12
            },
            {
                title: 'GitHub Profile',
                description: 'Personal GitHub profile with comprehensive project showcase and contribution history.',
                tech: ['Markdown', 'GitHub Actions', 'Badges'],
                github: 'https://github.com/hijack-00/hijack-00',
                link: 'https://github.com/hijack-00',
                linkType: 'website',
                status: 'Maintained',
                screenshot: '/screenshots/github-profile.png',
                order: 13
            },
            {
                title: 'Coch AI',
                description: 'AI-powered employee training and assessment platform with role-based dashboards.',
                tech: ['Flutter', 'AI/ML', 'Firebase', 'Analytics'],
                github: 'https://github.com/hijack-00/cochai',
                link: '/apk/coch-ai.apk',
                linkType: 'apk',
                status: 'Active',
                screenshot: '/screenshots/coch-ai.png',
                order: 14
            },
            {
                title: 'KVS',
                description: 'EMI extension and finance management application with repayment workflow automation.',
                tech: ['Flutter', 'Firebase', 'Razorpay', 'PDF'],
                github: 'https://github.com/hijack-00/kvs',
                link: '/apk/kvs.apk',
                linkType: 'apk',
                status: 'Deployed',
                screenshot: '/screenshots/kvs.png',
                order: 15
            },
            {
                title: 'AOT Encyclopedia',
                description: 'Comprehensive encyclopedia application with advanced search and categorization features.',
                tech: ['Flutter', 'SQLite', 'Search', 'Cache'],
                github: 'https://github.com/hijack-00/aotencyclopedia',
                link: '/apk/aot-encyclopedia.apk',
                linkType: 'apk',
                status: 'Completed',
                screenshot: '/screenshots/aot-encyclopedia.png',
                order: 16
            },
            {
                title: 'URMS (New)',
                description: 'University Resource Management System for academic administration and student services.',
                tech: ['React', 'Node.js', 'PostgreSQL', 'Material UI'],
                github: 'https://github.com/Digi-India-Solutions/URMS-NEW-',
                link: '#',
                linkType: 'website',
                status: 'Development',
                screenshot: '/screenshots/urms-new.png',
                order: 17
            },
            {
                title: 'Loan App',
                description: 'Digital loan application and management platform with automated approval workflows.',
                tech: ['Flutter', 'Firebase', 'ML', 'Payment Gateway'],
                github: 'https://github.com/hijack-00/loanApp',
                link: '/apk/loan-app.apk',
                linkType: 'apk',
                status: 'Active',
                screenshot: '/screenshots/loan-app.png',
                order: 18
            },
            {
                title: 'Sorted Backend',
                description: 'Backend service for task management and organization with RESTful API architecture.',
                tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
                github: 'https://github.com/hijack-00/sorted_Backend',
                link: '#',
                linkType: 'website',
                status: 'Active',
                screenshot: '/screenshots/sorted-backend.png',
                order: 19
            },
            {
                title: 'WEC',
                description: 'Web Event Calendar platform for managing and scheduling events with notifications.',
                tech: ['React', 'Node.js', 'MongoDB', 'Calendar API'],
                github: 'https://github.com/Digi-India-Solutions/wec',
                link: '#',
                linkType: 'website',
                status: 'Completed',
                screenshot: '/screenshots/wec.png',
                order: 20
            },
            {
                title: 'KVS Total Care',
                description: 'Comprehensive care management system with customer tracking and service scheduling.',
                tech: ['React', 'Laravel', 'MySQL', 'Notifications'],
                github: 'https://github.com/Digi-India-Solutions/kvs-total-care',
                link: '#',
                linkType: 'website',
                status: 'Active',
                screenshot: '/screenshots/kvs-total-care.png',
                order: 21
            },
            {
                title: 'Whispr',
                description: 'Anonymous chat application with invite-based system and auto-deletion features.',
                tech: ['Flutter', 'Firebase', 'Encryption', 'WebSocket'],
                github: 'https://github.com/hijack-00/whispr',
                link: '/apk/whispr.apk',
                linkType: 'apk',
                status: 'Beta',
                screenshot: '/screenshots/whispr.png',
                order: 22
            },
            {
                title: 'Jeans Final',
                description: 'Final production version of jeans e-commerce platform with advanced features.',
                tech: ['React', 'Node.js', 'Stripe', 'AWS S3'],
                github: 'https://github.com/Digi-India-Solutions/jeans-final',
                link: '#',
                linkType: 'website',
                status: 'Deployed',
                screenshot: '/screenshots/jeans-final.png',
                order: 23
            },
            {
                title: 'Luvnestor Professional',
                description: 'Professional version of dating application with enhanced matching algorithms.',
                tech: ['Flutter', 'Firebase', 'ML Matching', 'Payments'],
                github: 'https://github.com/Digi-India-Solutions/luvnestor-professional',
                link: '/apk/luvnestor-pro.apk',
                linkType: 'apk',
                status: 'Active',
                screenshot: '/screenshots/luvnestor-pro.png',
                order: 24
            },
            {
                title: 'Luvnestor App',
                description: 'Dating and relationship application with user profiles and matching system.',
                tech: ['Flutter', 'Firebase', 'Cloud Functions', 'Storage'],
                github: 'https://github.com/Digi-India-Solutions/luvnestor-app',
                link: '/apk/luvnestor.apk',
                linkType: 'apk',
                status: 'Deployed',
                screenshot: '/screenshots/luvnestor-app.png',
                order: 25
            },
            {
                title: 'URMS Latest',
                description: 'Latest version of University Resource Management System with improved features.',
                tech: ['Next.js', 'PostgreSQL', 'Prisma', 'TypeScript'],
                github: 'https://github.com/Digi-India-Solutions/urms-latest',
                link: '#',
                linkType: 'website',
                status: 'Active',
                screenshot: '/screenshots/urms-latest.png',
                order: 26
            },
            {
                title: 'To-Do List',
                description: 'Task management application with priority sorting and deadline tracking.',
                tech: ['React', 'LocalStorage', 'Material UI', 'PWA'],
                github: 'https://github.com/hijack-00/to-do-list',
                link: '#',
                linkType: 'website',
                status: 'Completed',
                screenshot: '/screenshots/todo-list.png',
                order: 27
            },
            {
                title: '2048 Game',
                description: 'Classic 2048 puzzle game implementation with smooth animations and scoring.',
                tech: ['JavaScript', 'CSS3', 'HTML5', 'LocalStorage'],
                github: 'https://github.com/hijack-00/2048-game',
                link: '#',
                linkType: 'website',
                status: 'Completed',
                screenshot: '/screenshots/2048-game.png',
                order: 28
            }
        ];

        await Project.insertMany(projects);
        console.log(`✅ Created ${projects.length} projects`);

        // Certifications
        const certifications = [
            {
                title: 'Full-Stack Web Development',
                description: 'Complete web development bootcamp certification',
                progress: 100,
                status: 'Completed',
                topics: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
                order: 1
            },
            {
                title: 'Mobile App Development',
                description: 'Flutter & React Native certification program',
                progress: 95,
                status: 'Completed',
                topics: ['Flutter', 'React Native', 'Firebase', 'Mobile UI/UX'],
                order: 2
            },
            {
                title: 'AWS Cloud Practitioner',
                description: 'Amazon Web Services fundamentals and deployment',
                progress: 70,
                status: 'In Progress',
                topics: ['EC2', 'S3', 'Lambda', 'RDS', 'CloudFormation'],
                order: 3
            },
            {
                title: 'WordPress Development',
                description: 'Advanced WordPress theme and plugin development',
                progress: 100,
                status: 'Completed',
                topics: ['Theme Development', 'Plugin Development', 'WooCommerce', 'Gutenberg'],
                order: 4
            },
            {
                title: 'Shopify Expert',
                description: 'Shopify theme customization and app development',
                progress: 85,
                status: 'Active',
                topics: ['Liquid', 'Shopify APIs', 'App Development', 'Store Optimization'],
                order: 5
            },
            {
                title: 'React & Next.js Mastery',
                description: 'Certified Ethical Hacker certification path',
                progress: 60,
                status: 'In Progress',
                topics: ['Penetration Testing', 'Web Security', 'Network Security', 'Exploit Development'],
                order: 6
            },
            {
                title: 'Database Management',
                description: 'SQL and NoSQL database administration',
                progress: 90,
                status: 'Completed',
                topics: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
                order: 7
            },
            {
                title: 'DevOps Fundamentals',
                description: 'CI/CD pipelines and deployment automation',
                progress: 75,
                status: 'Active',
                topics: ['Docker', 'GitHub Actions', 'CI/CD', 'Server Management'],
                order: 8
            },
            {
                title: 'UI/UX Design',
                description: 'User interface and experience design principles',
                progress: 80,
                status: 'Completed',
                topics: ['Figma', 'User Research', 'Wireframing', 'Responsive Design'],
                order: 9
            }
        ];

        await Certification.insertMany(certifications);
        console.log(`✅ Created ${certifications.length} certifications`);

        // Blog Posts
        const blogs = [
            {
                title: 'Building Scalable REST APIs with Node.js',
                category: 'Backend',
                preview: 'Complete guide to creating production-ready RESTful APIs with Express, authentication, and best practices.',
                content: 'Full blog content would go here...',
                date: new Date('2024-01-15'),
                readTime: '12 min read',
                slug: 'building-scalable-rest-apis-with-nodejs',
                isPublished: true,
                order: 1
            },
            {
                title: 'Flutter vs React Native: Which to Choose?',
                category: 'Mobile Dev',
                preview: 'In-depth comparison of cross-platform mobile frameworks to help you make the right choice for your project.',
                content: 'Full blog content would go here...',
                date: new Date('2024-01-10'),
                readTime: '10 min read',
                slug: 'flutter-vs-react-native-which-to-choose',
                isPublished: true,
                order: 2
            },
            {
                title: 'WordPress Security: Essential Best Practices',
                category: 'Security',
                preview: 'Comprehensive security checklist for WordPress sites to protect against common vulnerabilities and attacks.',
                content: 'Full blog content would go here...',
                date: new Date('2024-01-05'),
                readTime: '15 min read',
                slug: 'wordpress-security-essential-best-practices',
                isPublished: true,
                order: 3
            },
            {
                title: 'E-commerce Development: From Concept to Launch',
                category: 'E-commerce',
                preview: 'Step-by-step guide to building a complete e-commerce platform with payment integration and inventory management.',
                content: 'Full blog content would go here...',
                date: new Date('2024-01-01'),
                readTime: '18 min read',
                slug: 'ecommerce-development-from-concept-to-launch',
                isPublished: true,
                order: 4
            },
            {
                title: 'Shopify Liquid: Advanced Customization',
                category: 'Shopify',
                preview: 'Master Shopify theme development with advanced Liquid templating techniques and custom functionality.',
                content: 'Full blog content would go here...',
                date: new Date('2023-12-28'),
                readTime: '14 min read',
                slug: 'shopify-liquid-advanced-customization',
                isPublished: true,
                order: 5
            },
            {
                title: 'Deploying Full-Stack Apps to AWS',
                category: 'DevOps',
                preview: 'Complete deployment guide for hosting React + Node.js applications on AWS with auto-scaling and SSL.',
                content: 'Full blog content would go here...',
                date: new Date('2023-12-25'),
                readTime: '20 min read',
                slug: 'deploying-fullstack-apps-to-aws',
                isPublished: true,
                order: 6
            }
        ];

        await Blog.insertMany(blogs);
        console.log(`✅ Created ${blogs.length} blog posts`);

        // Create Admin User
        const admin = new Admin({
            email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
            password: process.env.ADMIN_PASSWORD || 'Admin@12345',
            name: 'Admin'
        });

        await admin.save();
        console.log('✅ Admin user created');

        console.log('\n🎉 Database seeded successfully!');
        console.log('\nAdmin credentials:');
        console.log('Email:', admin.email);
        console.log('Password: Admin@12345');
        console.log('\nData created:');
        console.log(`- 1 Profile`);
        console.log(`- 1 About`);
        console.log(`- ${skills.length} Skills`);
        console.log(`- ${tools.length} Tools`);
        console.log(`- ${projects.length} Projects`);
        console.log(`- ${certifications.length} Certifications`);
        console.log(`- ${blogs.length} Blog Posts`);
        console.log(`- 1 Admin User`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
