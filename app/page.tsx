
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [matrixCode, setMatrixCode] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  const texts = [
    'Initializing systems...',
    'Access granted...',
    'Welcome to the digital workspace of Aadil Khan.',
    'IT Consultant • Developer • Ethical Hacker',
    'Building innovative solutions...',
    'Applications Websites Everything...',
    'Connect With Me...'

  ];

  const sections = ['home', 'about-me', 'skills', 'tools', 'projects', 'certifications', 'blog', 'contact'];

  useEffect(() => {
    const generateMatrixCode = () => {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      let result = '';
      for (let i = 0; i < 500; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setMatrixCode(result);
    };

    generateMatrixCode();
    const interval = setInterval(generateMatrixCode, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseTime = 1500;

    const type = () => {
      const currentText = texts[currentTextIndex];

      if (!isDeleting) {
        if (typedText.length < currentText.length) {
          setTypedText(currentText.substring(0, typedText.length + 1));
        } else {
          setTimeout(() => {
            if (currentTextIndex < texts.length - 1) {
              setIsDeleting(true);
            }
          }, pauseTime);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentText.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentTextIndex, texts]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-green-400 min-h-screen font-mono relative overflow-hidden">
      {/* Binary Rain Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 text-xs leading-none break-all animate-pulse">
          {matrixCode}
        </div>
      </div>

      {/* Animated Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-green-400/40">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-green-400 animate-pulse">
            <span className="text-green-300">&gt;</span> AADIL.KHAN
          </div>
          <div className="flex space-x-6">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about-me', label: 'About Me' },
              { id: 'skills', label: 'Skills' },
              { id: 'tools', label: 'Tools' },
              { id: 'projects', label: 'Projects' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'blog', label: 'Blog' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 hover:animate-pulse whitespace-nowrap ${activeSection === item.id
                  ? 'text-green-200 border-b-2 border-green-400'
                  : 'text-green-400 hover:text-green-200'
                  }`}
              >
                [{item.label}]
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-black/50"></div>
        <div className="text-center max-w-4xl relative z-10">
          <div className="mb-8 text-6xl font-bold animate-pulse">
            <span className="text-green-400">&gt;</span>
            <span className="text-green-200 animate-ping">_</span>
          </div>
          <div className="text-2xl md:text-4xl mb-8 h-20 flex items-center justify-center">
            <span className="animate-pulse">
              {typedText}
              <span className="animate-ping text-green-300">|</span>
            </span>
          </div>
          <div className="mb-8 text-lg text-green-300 animate-pulse">
            IT Consultant • Full-Stack Developer • Ethical Hacker • Software Solutions Expert
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/Aadil_Khan_Resume.pdf"
              download
              className="bg-green-400 text-black px-8 py-4 rounded-none hover:bg-green-300 transition-all duration-300 font-bold whitespace-nowrap hover:animate-pulse transform hover:scale-105"
            >
              [DOWNLOAD_RESUME.PDF]
            </a>
            <button
              onClick={() => scrollToSection('about-me')}
              className="border-2 border-green-400 text-green-400 px-8 py-4 rounded-none hover:bg-green-400 hover:text-black transition-all duration-300 font-bold whitespace-nowrap transform hover:scale-105"
            >
              [EXPLORE_PROFILE]
            </button>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about-me" className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-green-400 animate-pulse">
            &gt; ABOUT_ME.exe
          </h2>
          <div className="bg-black/60 border border-green-400/40 p-8 rounded-none backdrop-blur-sm">
            <div className="text-lg leading-relaxed space-y-6">
              <p className="text-green-300">
                <span className="text-green-400">$</span> whoami
              </p>
              <p className="text-green-200">
                I'm Aadil Khan, a versatile IT Consultant and Full-Stack Developer specializing in end-to-end technology solutions. From mobile apps to enterprise web applications, cybersecurity to e-commerce platforms, I deliver comprehensive digital solutions that drive business success.
              </p>
              <p className="text-green-300">
                <span className="text-green-400">$</span> cat expertise.txt
              </p>
              <p className="text-green-200">
                My expertise spans <strong>Android & iOS app development</strong>, <strong>static/dynamic/e-commerce website development</strong>, <strong>WordPress & Shopify</strong> customization, <strong>backend API development</strong>, <strong>software solutions</strong>, <strong>domain hosting management</strong>, and <strong>ethical hacking/cybersecurity</strong>. I bring a security-first approach to every project I build.
              </p>
              <p className="text-green-300">
                <span className="text-green-400">$</span> echo $SERVICES
              </p>
              <p className="text-green-200">
                I provide custom web applications, mobile app development, e-commerce solutions, API development, security audits, WordPress/Shopify stores, hosting setup, and complete software development lifecycle management. Whether you need a startup MVP or enterprise-grade application, I've got you covered.
              </p>
              <p className="text-green-300">
                <span className="text-green-400">$</span> sudo echo $MISSION
              </p>
              <p className="text-green-200">
                To empower businesses with robust, secure, and scalable technology solutions. I combine development expertise with cybersecurity knowledge to build applications that not only meet business goals but are also protected against modern digital threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-8 text-green-400 animate-pulse">
            &gt; SKILLS_MATRIX.sh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Web Development', level: 'Expert', progress: 95 },
              { name: 'App Development (Android/iOS)', level: 'Advanced', progress: 90 },
              { name: 'Backend/API Development', level: 'Expert', progress: 92 },
              { name: 'WordPress/Shopify', level: 'Advanced', progress: 88 },
              { name: 'E-commerce Solutions', level: 'Advanced', progress: 85 },
              { name: 'Cybersecurity & Ethical Hacking', level: 'Advanced', progress: 80 },
              { name: 'Database Management', level: 'Expert', progress: 90 },
              { name: 'Cloud & Hosting', level: 'Advanced', progress: 85 },
              { name: 'UI/UX Design', level: 'Intermediate', progress: 75 },
              { name: 'Software Architecture', level: 'Advanced', progress: 87 },
              { name: 'Version Control (Git)', level: 'Expert', progress: 93 },
              { name: 'DevOps & Deployment', level: 'Advanced', progress: 82 }
            ].map((skill, index) => (
              <div
                key={skill.name}
                className="bg-black/60 border border-green-400/40 p-6 rounded-none hover:border-green-400 transition-all duration-300 hover:animate-pulse backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold text-green-300 mb-2">{skill.name}</h3>
                <div className="text-sm text-green-400 mb-3">
                  Status: {skill.level}
                </div>
                <div className="w-full bg-green-900/30 h-3 rounded-none mb-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-300 h-3 rounded-none transition-all duration-1000 animate-pulse"
                    style={{ width: `${skill.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-green-300">{skill.progress}% Complete</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-8 text-green-400 animate-pulse">
            &gt; TOOLS_ARSENAL.bin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'React/Next.js', icon: 'ri-reactjs-line', status: 'Expert' },
              { name: 'Flutter/React Native', icon: 'ri-smartphone-line', status: 'Advanced' },
              { name: 'Node.js/Express', icon: 'ri-code-s-slash-line', status: 'Expert' },
              { name: 'WordPress', icon: 'ri-wordpress-line', status: 'Expert' },
              { name: 'Shopify', icon: 'ri-shopping-bag-line', status: 'Advanced' },
              { name: 'MongoDB/MySQL', icon: 'ri-database-2-line', status: 'Expert' },
              { name: 'Git/GitHub', icon: 'ri-git-branch-line', status: 'Expert' },
              // { name: 'Docker', icon: 'ri-terminal-box-line', status: 'Advanced' },
              // { name: 'AWS/Hostinger', icon: 'ri-cloud-line', status: 'Advanced' },
              { name: 'Banner/Logo Design', icon: 'ri-palette-line', status: 'Proficient' },
              // { name: 'Burp Suite', icon: 'ri-bug-line', status: 'Advanced' },
              { name: 'Postman/APIs', icon: 'ri-file-code-line', status: 'Expert' }
            ].map((tool, index) => (
              <div
                key={tool.name}
                className="bg-black/60 border border-green-400/40 p-6 rounded-none hover:border-green-400 transition-all duration-300 hover:animate-pulse backdrop-blur-sm group text-center"
              >
                <div className="mb-4">
                  <i className={`${tool.icon} text-4xl text-green-400 group-hover:text-green-300 transition-colors duration-300 w-12 h-12 flex items-center justify-center mx-auto`}></i>
                </div>
                <h3 className="text-lg font-bold text-green-300 mb-2">{tool.name}</h3>
                <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded-none">
                  {tool.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-8 text-green-400 animate-pulse">
            &gt; PROJECTS_REPOSITORY.git
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-commerce Platform',
                description: 'Full-featured e-commerce solution with payment gateway integration, inventory management, and admin dashboard.',
                tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
                // github: 'https://github.com/hijack-00/ecommerce-platform',
                status: 'Completed'
              },
              {
                title: 'Mobile Food Delivery App',
                description: 'Cross-platform mobile application with real-time order tracking, payment integration, and push notifications.',
                tech: ['Flutter', 'Firebase', 'Google Maps API', 'Razorpay'],
                // github: 'https://github.com/hijack-00/food-delivery-app',
                status: 'Active'
              },
              {
                title: 'WordPress Multi-Vendor Store',
                description: 'Custom WordPress solution with WooCommerce for multi-vendor marketplace with commission system.',
                tech: ['WordPress', 'WooCommerce', 'PHP', 'MySQL'],
                // github: 'https://github.com/hijack-00/wp-multivendor',
                status: 'Completed'
              },
              {
                title: 'RESTful API Development',
                description: 'Scalable backend API for mobile app with JWT authentication, role-based access, and comprehensive documentation.',
                tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger'],
                github: 'https://github.com/hijack-00/3dMockupBackend',
                status: 'Active'
              },
              {
                title: 'Security Audit Tool',
                description: 'Automated web application security scanner for detecting XSS, SQL injection, and CSRF vulnerabilities.',
                tech: ['Python', 'Selenium', 'BeautifulSoup', 'OWASP ZAP'],
                // github: 'https://github.com/hijack-00/security-audit-tool',
                status: 'Beta'
              },
              {
                title: 'Shopify Custom Theme',
                description: 'Premium Shopify theme with advanced customization options, mega menu, and conversion-optimized design.',
                tech: ['Liquid', 'JavaScript', 'Shopify API', 'CSS3'],
                // github: 'https://github.com/hijack-00/shopify-custom-theme',
                status: 'Completed'
              },
              {
                title: 'SaaS Dashboard Application',
                description: 'Enterprise SaaS platform with subscription management, analytics dashboard, and multi-tenancy support.',
                tech: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma', 'Stripe'],
                // github: 'https://github.com/hijack-00/saas-dashboard',
                status: 'In Progress'
              },
              {
                title: 'Real Estate Portal',
                description: 'Dynamic property listing website with advanced search, virtual tours, and lead management system.',
                tech: ['React', 'Node.js', 'MongoDB', 'Google Maps'],
                // github: 'https://github.com/hijack-00/real-estate-portal',
                status: 'Completed'
              },
              {
                title: 'Social Media Management Tool',
                description: 'Web application for scheduling posts, analytics tracking, and managing multiple social media accounts.',
                tech: ['Vue.js', 'Laravel', 'MySQL', 'Social APIs'],
                // github: 'https://github.com/hijack-00/social-media-tool',
                status: 'Development'
              }
            ].map((project, index) => (
              <div
                key={index}
                className="bg-black/60 border border-green-400/40 p-6 rounded-none hover:border-green-400 transition-all duration-300 hover:animate-pulse backdrop-blur-sm group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-green-300 group-hover:text-green-200">
                    {project.title}
                  </h3>
                  <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded-none">
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-green-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-400 hover:text-green-200 transition-colors duration-300 whitespace-nowrap"
                >
                  <i className="ri-github-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  [VIEW_SOURCE]
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-8 text-green-400 animate-pulse">
            &gt; CERTIFICATIONS.cert
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Full-Stack Web Development',
                description: 'Complete web development bootcamp certification',
                progress: 100,
                status: 'Completed',
                topics: ['React', 'Node.js', 'MongoDB', 'REST APIs']
              },
              {
                title: 'Mobile App Development',
                description: 'Flutter & React Native certification program',
                progress: 95,
                status: 'Completed',
                topics: ['Flutter', 'React Native', 'Firebase', 'Mobile UI/UX']
              },
              {
                title: 'AWS Cloud Practitioner',
                description: 'Amazon Web Services fundamentals and deployment',
                progress: 70,
                status: 'In Progress',
                topics: ['EC2', 'S3', 'Lambda', 'RDS', 'CloudFormation']
              },
              {
                title: 'WordPress Development',
                description: 'Advanced WordPress theme and plugin development',
                progress: 100,
                status: 'Completed',
                topics: ['Theme Development', 'Plugin Development', 'WooCommerce', 'Gutenberg']
              },
              {
                title: 'Shopify Expert',
                description: 'Shopify theme customization and app development',
                progress: 85,
                status: 'Active',
                topics: ['Liquid', 'Shopify APIs', 'App Development', 'Store Optimization']
              },
              {
                title: 'Ethical Hacking (CEH)',
                description: 'Certified Ethical Hacker certification path',
                progress: 60,
                status: 'In Progress',
                topics: ['Penetration Testing', 'Web Security', 'Network Security', 'Exploit Development']
              },
              {
                title: 'Database Management',
                description: 'SQL and NoSQL database administration',
                progress: 90,
                status: 'Completed',
                topics: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis']
              },
              {
                title: 'DevOps Fundamentals',
                description: 'CI/CD pipelines and deployment automation',
                progress: 75,
                status: 'Active',
                topics: ['Docker', 'GitHub Actions', 'CI/CD', 'Server Management']
              },
              {
                title: 'UI/UX Design',
                description: 'User interface and experience design principles',
                progress: 80,
                status: 'Completed',
                topics: ['Figma', 'User Research', 'Wireframing', 'Responsive Design']
              }
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-black/60 border border-green-400/40 p-6 rounded-none hover:border-green-400 transition-all duration-300 hover:animate-pulse backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-green-300">{cert.title}</h3>
                  <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded-none">
                    {cert.status}
                  </span>
                </div>
                <p className="text-sm text-green-400 mb-4">{cert.description}</p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-green-300">Progress</span>
                    <span className="text-green-400">{cert.progress}%</span>
                  </div>
                  <div className="w-full bg-green-900/30 h-2 rounded-none">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-300 h-2 rounded-none transition-all duration-1000"
                      style={{ width: `${cert.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cert.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded-none"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-8 text-green-400 animate-pulse">
            &gt; BLOG_POSTS.md
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Building Scalable REST APIs with Node.js',
                date: '2024-01-15',
                category: 'Backend',
                preview: 'Complete guide to creating production-ready RESTful APIs with Express, authentication, and best practices.',
                readTime: '12 min read'
              },
              {
                title: 'Flutter vs React Native: Which to Choose?',
                date: '2024-01-10',
                category: 'Mobile Dev',
                preview: 'In-depth comparison of cross-platform mobile frameworks to help you make the right choice for your project.',
                readTime: '10 min read'
              },
              {
                title: 'WordPress Security: Essential Best Practices',
                date: '2024-01-05',
                category: 'Security',
                preview: 'Comprehensive security checklist for WordPress sites to protect against common vulnerabilities and attacks.',
                readTime: '15 min read'
              },
              {
                title: 'E-commerce Development: From Concept to Launch',
                date: '2024-01-01',
                category: 'E-commerce',
                preview: 'Step-by-step guide to building a complete e-commerce platform with payment integration and inventory management.',
                readTime: '18 min read'
              },
              {
                title: 'Shopify Liquid: Advanced Customization',
                date: '2023-12-28',
                category: 'Shopify',
                preview: 'Master Shopify theme development with advanced Liquid templating techniques and custom functionality.',
                readTime: '14 min read'
              },
              {
                title: 'Deploying Full-Stack Apps to AWS',
                date: '2023-12-25',
                category: 'DevOps',
                preview: 'Complete deployment guide for hosting React + Node.js applications on AWS with auto-scaling and SSL.',
                readTime: '20 min read'
              },
              {
                title: 'Database Design for Modern Web Apps',
                date: '2023-12-20',
                category: 'Database',
                preview: 'Best practices for designing efficient, scalable databases for web applications with MongoDB and PostgreSQL.',
                readTime: '16 min read'
              },
              {
                title: 'Web Application Security Checklist',
                date: '2023-12-15',
                category: 'Security',
                preview: 'Essential security measures every web developer should implement to protect applications and user data.',
                readTime: '12 min read'
              },
              {
                title: 'Optimizing WordPress for Performance',
                date: '2023-12-10',
                category: 'WordPress',
                preview: 'Proven techniques to dramatically improve WordPress site speed and achieve 90+ PageSpeed scores.',
                readTime: '14 min read'
              }
            ].map((post, index) => (
              <div
                key={index}
                className="bg-black/60 border border-green-400/40 p-6 rounded-none hover:border-green-400 transition-all duration-300 hover:animate-pulse backdrop-blur-sm group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded-none">
                    {post.category}
                  </span>
                  <span className="text-xs text-green-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-green-300 group-hover:text-green-200 mb-3">
                  {post.title}
                </h3>
                <p className="text-sm text-green-400 mb-4">{post.preview}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-500">{post.readTime}</span>
                  <span className="text-green-400 hover:text-green-200 text-sm">
                    [READ_MORE]
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="bg-black/60 border border-green-400/40 p-8 rounded-none backdrop-blur-sm">
              <p className="text-green-300 text-lg">
                <span className="text-green-400">$</span> echo "More articles coming soon..."
              </p>
              <p className="text-green-400 mt-2">
                Stay tuned for in-depth tutorials on web development, mobile apps, e-commerce, cybersecurity, and software solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-8 text-green-400 animate-pulse">
            &gt; CONTACT_INTERFACE.exe
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-green-300 mb-6">
                Send Encrypted Message
              </h3>
              <form id="contact-form" className="space-y-6">
                <div>
                  <label className="block text-green-400 mb-2">Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full bg-black/60 border border-green-400/40 p-3 rounded-none text-green-300 focus:border-green-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-green-400 mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full bg-black/60 border border-green-400/40 p-3 rounded-none text-green-300 focus:border-green-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-green-400 mb-2">Subject:</label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full bg-black/60 border border-green-400/40 p-3 rounded-none text-green-300 focus:border-green-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter message subject"
                    required
                  />
                </div>
                <div>
                  <label className="block text-green-400 mb-2">Message:</label>
                  <textarea
                    name="message"
                    rows={6}
                    maxLength={500}
                    className="w-full bg-black/60 border border-green-400/40 p-3 rounded-none text-green-300 focus:border-green-400 focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none"
                    placeholder="Enter your message (max 500 characters)"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-400 text-black px-6 py-3 rounded-none hover:bg-green-300 transition-all duration-300 font-bold whitespace-nowrap transform hover:scale-105"
                >
                  [TRANSMIT_MESSAGE]
                </button>
              </form>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-300 mb-6">
                Network Connections
              </h3>
              <div className="space-y-6">
                <div className="flex items-center bg-black/60 border border-green-400/40 p-4 rounded-none backdrop-blur-sm">
                  <i className="ri-mail-line text-2xl text-green-400 mr-4 w-8 h-8 flex items-center justify-center"></i>
                  <div>
                    <p className="text-green-300 font-bold">Email</p>
                    <p className="text-green-400">aadil.khan@protonmail.com</p>
                  </div>
                </div>
                <div className="flex items-center bg-black/60 border border-green-400/40 p-4 rounded-none backdrop-blur-sm">
                  <i className="ri-github-line text-2xl text-green-400 mr-4 w-8 h-8 flex items-center justify-center"></i>
                  <div>
                    <p className="text-green-300 font-bold">GitHub</p>
                    <a
                      href="https://github.com/hijack-00"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-200 transition-colors duration-300"
                    >
                      github.com/aadilkhan
                    </a>
                  </div>
                </div>
                <div className="flex items-center bg-black/60 border border-green-400/40 p-4 rounded-none backdrop-blur-sm">
                  <i className="ri-linkedin-line text-2xl text-green-400 mr-4 w-8 h-8 flex items-center justify-center"></i>
                  <div>
                    <p className="text-green-300 font-bold">LinkedIn</p>
                    <a
                      href="https://linkedin.com/in/aadilkhan00"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-200 transition-colors duration-300"
                    >
                      linkedin.com/in/aadilkhan
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-black/60 border border-green-400/40 rounded-none backdrop-blur-sm">
                <p className="text-green-300 text-sm mb-2">
                  <span className="text-green-400">$</span> cat availability.txt
                </p>
                <p className="text-green-400 text-sm">
                  Available for web/app development projects, e-commerce solutions, WordPress/Shopify customization, API development, security audits, and IT consulting services.
                </p>
                <p className="text-green-300 text-sm mt-4">
                  <span className="text-green-400">$</span> echo "Response time: 24-48 hours"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-green-400/40">
        <div className="container mx-auto text-center">
          <p className="text-green-400 animate-pulse">
            © 2024 Aadil Khan | IT Consultant • Developer • Ethical Hacker
          </p>
          <p className="text-green-500 text-sm mt-2">
            "Building secure, scalable solutions for the digital world."
          </p>
        </div>
      </footer>
    </div>
  );
}
