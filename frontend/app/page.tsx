
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import ParticlesBackground from './components/ParticlesBackground';
import DataStatusIndicator from './components/DataStatusIndicator';
import { usePortfolioData } from './hooks/usePortfolioData';

export default function Home() {
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [matrixCode, setMatrixCode] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const router = useRouter();

  // Use the new portfolio data hook with stale-while-revalidate
  const { data, isLoading, fromCache, error, refresh } = usePortfolioData();

  // Destructure data for easier access
  const { profile, about, skills, tools, projects, certifications, blogs } = data;

  const texts = profile?.typingTexts || [
    'Initializing systems...',
    'Access granted...',
    'Welcome to the digital workspace of Aadil Khan.',
    'IT Consultant • Full-Stack Developer',
    'Building innovative solutions...'
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

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen || !selectedProject) return;

      const allScreenshots = [
        selectedProject.screenshot,
        ...(selectedProject.additionalScreenshots || [])
      ].filter(Boolean);

      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + allScreenshots.length) % allScreenshots.length);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % allScreenshots.length);
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedProject]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    setStatusMessage('');

    // Store form reference
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Save to database first (using live backend)
      const API_URL = 'https://api.aadilkhan.site/api';
      const contactData = {
        name: formData.get('from_name'),
        email: formData.get('from_email'),
        subject: formData.get('subject') || 'Contact Form Submission',
        message: formData.get('message')
      };

      await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });

      // Send email using EmailJS
      try {
        const result = await emailjs.sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_7u7mmti',
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_grobanr',
          form,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'PczSUP9frcUuIAMEc'
        );
        console.log('Email sent:', result.text);
      } catch (emailError) {
        console.warn('Email failed (message saved):', emailError);
      }
      // const result = await emailjs.sendForm(
      //   process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_7u7mmti',
      //   process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_grobanr',
      //   form,
      //   process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'PczSUP9frcUuIAMEc'
      // );



      setFormStatus('success');
      setStatusMessage('Message transmitted successfully! I\'ll get back to you soon.');
      form.reset();

      setTimeout(() => {
        setFormStatus('idle');
        setStatusMessage('');
      }, 5000);
    } catch (error) {
      console.error('Contact Error:', error);
      setFormStatus('error');

      if (error instanceof Error) {
        setStatusMessage(`Error: ${error.message}`);
      } else {
        setStatusMessage('Failed to send message. Please try again.');
      }
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

      {/* Particles Background */}
      <ParticlesBackground />

      {/* Data Status Indicator */}
      <DataStatusIndicator
        isLoading={isLoading}
        fromCache={fromCache}
        onRefresh={refresh}
      />

      {/* Mobile-Responsive Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-green-400/40">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-base sm:text-lg md:text-xl font-bold text-green-400 animate-pulse">
            <span className="text-green-300">&gt;</span> AADIL.KHAN
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-3 lg:space-x-6 text-sm lg:text-base">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-green-400 hover:text-green-200 transition-colors p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden bg-black/98 border-t border-green-400/40 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
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
                onClick={() => {
                  scrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 px-4 border-l-2 transition-all duration-300 ${activeSection === item.id
                  ? 'text-green-200 border-green-400 bg-green-400/10'
                  : 'text-green-400 border-green-400/40 hover:border-green-400 hover:bg-green-400/5'
                  }`}
              >
                {`> ${item.label.toUpperCase()}`}
              </button>
            ))}
          </div>
        </div>
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
            IT Consultant • Full-Stack Developer • Software Solutions Expert
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={profile?.resumeUrl || '/resume.html'}
              className="bg-green-400 text-black px-8 py-4 rounded-none hover:bg-green-300 transition-all duration-300 font-bold whitespace-nowrap hover:animate-pulse transform hover:scale-105"
            >
              [RESUME]
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
                {about?.whoami || "I'm Aadil Khan, a versatile IT Consultant and Full-Stack Developer specializing in end-to-end technology solutions. From mobile apps to enterprise web applications, e-commerce to custom software platforms, I deliver comprehensive digital solutions that drive business success."}
              </p>
              <p className="text-green-300">
                <span className="text-green-400">$</span> cat expertise.txt
              </p>
              <p className="text-green-200">
                {about?.expertise || "My expertise spans Android & iOS app development, static/dynamic/e-commerce website development, WordPress & Shopify customization, backend API development, software solutions, and domain hosting management. I bring a quality-first approach to every project I build."}
              </p>
              <p className="text-green-300">
                <span className="text-green-400">$</span> echo $SERVICES
              </p>
              <p className="text-green-200">
                {about?.services || "I provide custom web applications, mobile app development, e-commerce solutions, API development, security audits, WordPress/Shopify stores, hosting setup, and complete software development lifecycle management. Whether you need a startup MVP or enterprise-grade application, I've got you covered."}
              </p>
              <p className="text-green-300">
                <span className="text-green-400">$</span> sudo echo $MISSION
              </p>
              <p className="text-green-200">
                {about?.mission || "To empower businesses with robust, efficient, and scalable technology solutions. I combine development expertise with modern best practices to build applications that meet business goals and deliver exceptional user experiences."}
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
            {skills.length > 0 ? skills.map((skill, index) => (
              <div
                key={skill._id || index}
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
            )) : (
              <div className="col-span-3 text-center text-green-400">Loading skills...</div>
            )}
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
            {tools.length > 0 ? tools.map((tool, index) => (
              <div
                key={tool._id || index}
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
            )) : (
              <div className="col-span-3 text-center text-green-400">Loading tools...</div>
            )}
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
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-black/60 border border-green-400/40 p-6 rounded-none hover:border-green-400 transition-all duration-300 hover:animate-pulse backdrop-blur-sm group"
              >
                {/* Project Screenshot - Shows placeholder by default, image on hover */}
                <div className="mb-4 bg-green-900/20 border border-green-400/30 rounded-none overflow-hidden h-48 relative">
                  {/* Placeholder - Always visible, hidden on group hover */}
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-green-900/20 group-hover:opacity-0 transition-opacity duration-300 z-10">
                    <div className="text-center p-4">
                      <i className="ri-folder-image-line text-5xl text-green-400/50 mb-2 block animate-pulse"></i>
                      <p className="text-xs text-green-400/60">Hover to preview</p>
                    </div>
                  </div>

                  {/* Actual Image - Hidden by default, visible on group hover */}
                  {project.screenshot ? (
                    <img
                      src={
                        project.screenshot.startsWith('http')
                          ? project.screenshot
                          : `https://pub-7af46c577d63446abc6ecb190928cff7.r2.dev${project.screenshot.startsWith('/') ? '' : '/'}${project.screenshot}`
                      }
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      loading="lazy"
                      onError={(e) => {
                        // Hide broken image and show error in placeholder area
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center p-4">
                        <i className="ri-image-line text-4xl text-green-400/50 mb-2 block"></i>
                        <p className="text-xs text-green-400/60">No Screenshot Available</p>
                      </div>
                    </div>
                  )}
                </div>
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
                  {project.tech.map((tech: string) => (
                    <span
                      key={tech}
                      className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center text-green-400 hover:text-green-200 transition-colors duration-300 whitespace-nowrap font-bold"
                  >
                    <i className="ri-file-info-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                    [VIEW_DETAILS]
                  </button>
                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target={project.linkType === 'website' ? '_blank' : undefined}
                      rel={project.linkType === 'website' ? 'noopener noreferrer' : undefined}
                      download={project.linkType === 'apk' ? true : undefined}
                      className="inline-flex items-center text-green-400 hover:text-green-200 transition-colors duration-300 whitespace-nowrap"
                    >
                      <i className={`${project.linkType === 'website' ? 'ri-external-link-line' : 'ri-download-line'} mr-2 w-4 h-4 flex items-center justify-center`}></i>
                      [{project.linkType === 'website' ? 'VIEW' : 'DOWNLOAD'}]
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-500/70 hover:text-green-400 transition-colors duration-300 whitespace-nowrap text-xs"
                  >
                    <i className="ri-github-line mr-1 w-3 h-3 flex items-center justify-center"></i>
                    GitHub
                  </a>
                </div>
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
            {certifications.map((cert, index) => (
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
                  {cert.topics.map((topic: string) => (
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
            {/* {blogs.map((post, index) => (
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
            ].map((post, index) => ( */}
            {blogs.map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.slug}`}
                className="bg-black/60 border border-green-400/40 p-6 rounded-none hover:border-green-400 transition-all duration-300 hover:animate-pulse backdrop-blur-sm group cursor-pointer block"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded-none">
                    {post.category}
                  </span>
                  <span className="text-xs text-green-500">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <h3 className="text-xl font-bold text-green-300 group-hover:text-green-200 mb-3">
                  {post.title}
                </h3>
                <p className="text-sm text-green-400 mb-4">{post.preview}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-500">{post.readTime}</span>
                  <span className="text-green-400 hover:text-green-200 text-sm">
                    [READ_MORE] →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="bg-black/60 border border-green-400/40 p-8 rounded-none backdrop-blur-sm">
              <p className="text-green-300 text-lg">
                <span className="text-green-400">$</span> echo "More articles coming soon..."
              </p>
              <p className="text-green-400 mt-2">
                Stay tuned for in-depth tutorials on web development, mobile apps, e-commerce, APIs, and software solutions.
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
              <form id="contact-form" className="space-y-6" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block text-green-400 mb-2">Name:</label>
                  <input
                    type="text"
                    name="from_name"
                    className="w-full bg-black/60 border border-green-400/40 p-3 rounded-none text-green-300 focus:border-green-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your name"
                    required
                    disabled={formStatus === 'sending'}
                  />
                </div>
                <div>
                  <label className="block text-green-400 mb-2">Email:</label>
                  <input
                    type="email"
                    name="from_email"
                    className="w-full bg-black/60 border border-green-400/40 p-3 rounded-none text-green-300 focus:border-green-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your email"
                    required
                    disabled={formStatus === 'sending'}
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
                    disabled={formStatus === 'sending'}
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
                    disabled={formStatus === 'sending'}
                  ></textarea>
                </div>

                {/* Status Message */}
                {statusMessage && (
                  <div
                    className={`p-4 border rounded-none backdrop-blur-sm ${formStatus === 'success'
                      ? 'bg-green-900/20 border-green-400 text-green-300'
                      : 'bg-red-900/20 border-red-400 text-red-300'
                      }`}
                  >
                    <p className="text-sm">
                      <span className="text-green-400">$</span> {statusMessage}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full px-6 py-3 rounded-none transition-all duration-300 font-bold whitespace-nowrap transform ${formStatus === 'sending'
                    ? 'bg-green-600 text-black cursor-wait'
                    : 'bg-green-400 text-black hover:bg-green-300 hover:scale-105'
                    }`}
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? '[TRANSMITTING...]' : '[TRANSMIT_MESSAGE]'}
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
                      href={profile?.githubUrl || 'https://github.com/hijack-00'}
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
                      href={profile?.linkedinUrl || 'https://linkedin.com/in/aadilkhan00'}
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
          </p>
        </div>
      </footer>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="min-h-screen px-4 py-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto max-w-5xl">
              <div className="bg-black/80 border-2 border-green-400 rounded-none p-8 relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-green-400 hover:text-green-200 text-3xl transition-colors duration-300"
                >
                  <i className="ri-close-line"></i>
                </button>

                {/* Header */}
                <div className="mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-300">
                      <span className="text-green-400">&gt;</span> {selectedProject.title}
                    </h2>
                    <span className={`text-xs px-3 py-1 rounded-none ${selectedProject.status === 'Deployed' || selectedProject.status === 'Active'
                      ? 'bg-green-400 text-black'
                      : selectedProject.status === 'Development'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-green-400/20 text-green-400'
                      }`}>
                      {selectedProject.status}
                    </span>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.tech?.map((tech: string) => (
                      <span key={tech} className="text-xs bg-green-900/30 text-green-300 px-3 py-1 rounded-none border border-green-400/30">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 flex-wrap mt-4">
                    {selectedProject.link && selectedProject.link !== '#' && (
                      <a
                        href={selectedProject.link}
                        target={selectedProject.linkType === 'website' ? '_blank' : undefined}
                        rel={selectedProject.linkType === 'website' ? 'noopener noreferrer' : undefined}
                        download={selectedProject.linkType === 'apk' ? true : undefined}
                        className="inline-flex items-center bg-green-400 text-black px-6 py-3 rounded-none hover:bg-green-300 transition-all duration-300 font-bold"
                      >
                        <i className={`${selectedProject.linkType === 'website' ? 'ri-external-link-line' : 'ri-download-line'} mr-2`}></i>
                        [{selectedProject.linkType === 'website' ? 'LAUNCH_PROJECT' : 'DOWNLOAD_APK'}]
                      </a>
                    )}
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center border-2 border-green-400 text-green-400 px-6 py-3 rounded-none hover:bg-green-400 hover:text-black transition-all duration-300 font-bold"
                    >
                      <i className="ri-github-line mr-2"></i>
                      [VIEW_GITHUB]
                    </a>
                  </div>
                </div>

                {/* Main Screenshot */}
                {selectedProject.screenshot ? (
                  <div className="mb-8 border border-green-400/30 rounded-none overflow-hidden bg-green-900/10">
                    <img
                      src={
                        selectedProject.screenshot.startsWith('http')
                          ? selectedProject.screenshot
                          : `https://pub-7af46c577d63446abc6ecb190928cff7.r2.dev${selectedProject.screenshot.startsWith('/') ? '' : '/'}${selectedProject.screenshot}`
                      }
                      alt={selectedProject.title}
                      className="w-full h-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.error-placeholder')) {
                          parent.innerHTML = '<div class="error-placeholder w-full h-64 flex items-center justify-center"><div class="text-center p-8"><i class="ri-image-line text-6xl text-green-400/50 mb-4 block"></i><p class="text-green-400/60">Screenshot not available</p></div></div>';
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="mb-8 border border-green-400/30 rounded-none overflow-hidden bg-green-900/10 h-64 flex items-center justify-center">
                    <div className="text-center p-8">
                      <i className="ri-image-line text-6xl text-green-400/50 mb-4 block"></i>
                      <p className="text-green-400/60">No screenshot uploaded</p>
                    </div>
                  </div>
                )}

                {/* Project Info Grid */}
                {(selectedProject.role || selectedProject.client || selectedProject.teamSize || selectedProject.duration || selectedProject.completionTime) && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 p-6 bg-green-900/10 border border-green-400/30 rounded-none">
                    {selectedProject.role && (
                      <div>
                        <div className="text-green-400 text-xs mb-1">ROLE</div>
                        <div className="text-green-200">{selectedProject.role}</div>
                      </div>
                    )}
                    {selectedProject.client && (
                      <div>
                        <div className="text-green-400 text-xs mb-1">CLIENT</div>
                        <div className="text-green-200">{selectedProject.client}</div>
                      </div>
                    )}
                    {selectedProject.teamSize && (
                      <div>
                        <div className="text-green-400 text-xs mb-1">TEAM_SIZE</div>
                        <div className="text-green-200">{selectedProject.teamSize}</div>
                      </div>
                    )}
                    {selectedProject.duration && (
                      <div>
                        <div className="text-green-400 text-xs mb-1">DURATION</div>
                        <div className="text-green-200">{selectedProject.duration}</div>
                      </div>
                    )}
                    {selectedProject.completionTime && (
                      <div>
                        <div className="text-green-400 text-xs mb-1">TIME_INVESTED</div>
                        <div className="text-green-200">{selectedProject.completionTime}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center">
                    <i className="ri-file-text-line mr-2"></i>
                    PROJECT_OVERVIEW
                  </h3>
                  <p className="text-green-200 leading-relaxed whitespace-pre-line">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* Work Done */}
                {selectedProject.workDone && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center">
                      <i className="ri-code-s-slash-line mr-2"></i>
                      WORK_COMPLETED
                    </h3>
                    <p className="text-green-200 leading-relaxed whitespace-pre-line">
                      {selectedProject.workDone}
                    </p>
                  </div>
                )}

                {/* Features */}          {selectedProject.features && selectedProject.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center">
                      <i className="ri-checkbox-multiple-line mr-2"></i>
                      KEY_FEATURES
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature: string, idx: number) => (
                        <li key={idx} className="text-green-200 flex items-start">
                          <span className="text-green-400 mr-2">▸</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Challenges */}
                {selectedProject.challenges && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center">
                      <i className="ri-alert-line mr-2"></i>
                      CHALLENGES_FACED
                    </h3>
                    <p className="text-green-200 leading-relaxed whitespace-pre-line">
                      {selectedProject.challenges}
                    </p>
                  </div>
                )}

                {/* Learnings */}
                {selectedProject.learnings && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center">
                      <i className="ri-lightbulb-line mr-2"></i>
                      LEARNINGS_TAKEAWAYS
                    </h3>
                    <p className="text-green-200 leading-relaxed whitespace-pre-line">
                      {selectedProject.learnings}
                    </p>
                  </div>
                )}

                {/* Screenshot Gallery */}
                {(selectedProject.screenshot || (selectedProject.additionalScreenshots && selectedProject.additionalScreenshots.length > 0)) && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-green-400 mb-2 flex items-center">
                      <i className="ri-gallery-line mr-2"></i>
                      SCREENSHOT_GALLERY
                    </h3>
                    <p className="text-green-400/60 text-sm mb-4 flex items-center">
                      <i className="ri-cursor-line mr-2"></i>
                      Click any image to view full size • Use arrow keys or buttons to navigate
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {/* Main Screenshot */}
                      {selectedProject.screenshot && (
                        <div
                          className="border border-green-400/30 rounded-none overflow-hidden bg-green-900/10 aspect-video cursor-pointer group relative hover:border-green-400 transition-all duration-300"
                          onClick={() => {
                            setLightboxIndex(0);
                            setLightboxOpen(true);
                          }}
                        >
                          <img
                            src={
                              selectedProject.screenshot.startsWith('http')
                                ? selectedProject.screenshot
                                : `https://pub-7af46c577d63446abc6ecb190928cff7.r2.dev${selectedProject.screenshot.startsWith('/') ? '' : '/'}${selectedProject.screenshot}`
                            }
                            alt={`${selectedProject.title} main screenshot`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center">
                              <i className="ri-zoom-in-line text-3xl text-green-400 mb-1"></i>
                              <p className="text-green-400 text-xs">Click to view</p>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2 bg-green-400 text-black text-xs px-2 py-1 font-bold">
                            MAIN
                          </div>
                        </div>
                      )}

                      {/* Additional Screenshots */}
                      {selectedProject.additionalScreenshots?.map((screenshot: string, idx: number) => (
                        <div
                          key={idx}
                          className="border border-green-400/30 rounded-none overflow-hidden bg-green-900/10 aspect-video cursor-pointer group relative hover:border-green-400 transition-all duration-300"
                          onClick={() => {
                            setLightboxIndex(selectedProject.screenshot ? idx + 1 : idx);
                            setLightboxOpen(true);
                          }}
                        >
                          <img
                            src={
                              screenshot.startsWith('http')
                                ? screenshot
                                : `https://pub-7af46c577d63446abc6ecb190928cff7.r2.dev${screenshot.startsWith('/') ? '' : '/'}${screenshot}`
                            }
                            alt={`${selectedProject.title} screenshot ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center">
                              <i className="ri-zoom-in-line text-3xl text-green-400 mb-1"></i>
                              <p className="text-green-400 text-xs">Click to view</p>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2 bg-green-400/20 text-green-400 text-xs px-2 py-1 font-bold border border-green-400/30">
                            {idx + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black/98 z-[200] flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-green-400 hover:text-green-200 text-4xl z-10 transition-colors duration-300"
          >
            <i className="ri-close-line"></i>
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-green-400 text-sm z-10">
            {lightboxIndex + 1} / {[selectedProject.screenshot, ...(selectedProject.additionalScreenshots || [])].filter(Boolean).length}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const allScreenshots = [selectedProject.screenshot, ...(selectedProject.additionalScreenshots || [])].filter(Boolean);
              setLightboxIndex((prev) => (prev - 1 + allScreenshots.length) % allScreenshots.length);
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-200 bg-black/60 hover:bg-black/80 border border-green-400/30 hover:border-green-400 p-3 md:p-4 transition-all duration-300 z-10"
          >
            <i className="ri-arrow-left-s-line text-2xl md:text-4xl"></i>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const allScreenshots = [selectedProject.screenshot, ...(selectedProject.additionalScreenshots || [])].filter(Boolean);
              setLightboxIndex((prev) => (prev + 1) % allScreenshots.length);
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-200 bg-black/60 hover:bg-black/80 border border-green-400/30 hover:border-green-400 p-3 md:p-4 transition-all duration-300 z-10"
          >
            <i className="ri-arrow-right-s-line text-2xl md:text-4xl"></i>
          </button>

          {/* Main image */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const allScreenshots = [selectedProject.screenshot, ...(selectedProject.additionalScreenshots || [])].filter(Boolean);
              const currentScreenshot = allScreenshots[lightboxIndex];
              const imgSrc = currentScreenshot?.startsWith('http')
                ? currentScreenshot
                : `https://pub-7af46c577d63446abc6ecb190928cff7.r2.dev${currentScreenshot?.startsWith('/') ? '' : '/'}${currentScreenshot}`;

              return (
                <img
                  src={imgSrc}
                  alt={`${selectedProject.title} screenshot ${lightboxIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain border border-green-400/30"
                />
              );
            })()}
          </div>

          {/* Keyboard hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-green-400/60 text-xs flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1">
              <kbd className="px-2 py-1 bg-green-400/10 border border-green-400/30 rounded-none text-green-400">←</kbd>
              <kbd className="px-2 py-1 bg-green-400/10 border border-green-400/30 rounded-none text-green-400">→</kbd>
              to navigate
            </span>
            <span className="hidden md:flex items-center gap-1">
              <kbd className="px-2 py-1 bg-green-400/10 border border-green-400/30 rounded-none text-green-400">ESC</kbd>
              to close
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
