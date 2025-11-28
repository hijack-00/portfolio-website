
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
    'Booting system...',
    'Access granted...',
    'Welcome to the digital profile of Aadil Khan.'
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
                className={`transition-all duration-300 hover:animate-pulse whitespace-nowrap ${
                  activeSection === item.id
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
            Ethical Hacker • Cybersecurity Enthusiast • App Developer
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
                I'm Aadil Khan, a self-taught beginner hacker passionate about cybersecurity, ethical hacking, and app development. My journey into the digital security realm began with curiosity about how systems work and how they can be protected.
              </p>
              <p className="text-green-300">
                <span className="text-green-400">$</span> cat current_projects.log
              </p>
              <p className="text-green-200">
                Currently exploring penetration testing methodologies, system security analysis, and mobile application development. I'm working on personal projects that combine my interest in cybersecurity with practical app development skills.
              </p>
              <p className="text-green-300">
                <span className="text-green-400">$</span> echo $LEARNING_PATH
              </p>
              <p className="text-green-200">
                Continuously learning ethical hacking techniques, network security principles, and modern development frameworks. My goal is to contribute to digital security while building innovative applications.
              </p>
              <p className="text-green-300">
                <span className="text-green-400">$</span> sudo echo $MISSION
              </p>
              <p className="text-green-200">
                To become a skilled ethical hacker who can identify vulnerabilities, strengthen security postures, and develop secure applications that protect users and organizations from digital threats.
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
              { name: 'Linux Basics', level: 'Intermediate', progress: 70 },
              { name: 'Python Scripting', level: 'Intermediate', progress: 65 },
              { name: 'Penetration Testing', level: 'Beginner', progress: 40 },
              { name: 'App Development', level: 'Advanced', progress: 85 },
              { name: 'Networking Concepts', level: 'Intermediate', progress: 60 },
              { name: 'Web Security', level: 'Learning', progress: 35 },
              { name: 'System Analysis', level: 'Beginner', progress: 45 },
              { name: 'Mobile Security', level: 'Learning', progress: 30 }
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Kali Linux', icon: 'ri-terminal-line', status: 'Active' },
              { name: 'Burp Suite', icon: 'ri-bug-line', status: 'Learning' },
              { name: 'Nmap', icon: 'ri-radar-line', status: 'Proficient' },
              { name: 'Wireshark', icon: 'ri-pulse-line', status: 'Learning' },
              { name: 'Metasploit', icon: 'ri-shield-line', status: 'Beginner' },
              { name: 'Termux', icon: 'ri-smartphone-line', status: 'Active' },
              { name: 'OWASP ZAP', icon: 'ri-search-line', status: 'Learning' },
              { name: 'Netcat', icon: 'ri-links-line', status: 'Basic' }
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
                title: 'Personal Pentest Lab',
                description: 'Virtualized environment for practicing ethical hacking techniques and vulnerability assessment on various systems.',
                tech: ['VirtualBox', 'Kali Linux', 'Metasploitable', 'DVWA'],
                github: 'https://github.com/aadilkhan/pentest-lab',
                status: 'Active'
              },
              {
                title: 'Network Discovery Tool',
                description: 'Python-based network reconnaissance script for discovering live hosts, open ports, and service enumeration.',
                tech: ['Python', 'Nmap', 'Threading', 'JSON'],
                github: 'https://github.com/aadilkhan/network-discovery',
                status: 'Completed'
              },
              {
                title: 'Secure Mobile App',
                description: 'Flutter application demonstrating mobile security best practices and common vulnerability mitigations.',
                tech: ['Flutter', 'Firebase', 'Encryption', 'OWASP Mobile'],
                github: 'https://github.com/aadilkhan/secure-mobile-app',
                status: 'In Progress'
              },
              {
                title: 'Web Vuln Scanner',
                description: 'Automated web application security scanner for detecting XSS, SQL injection, and other common vulnerabilities.',
                tech: ['Python', 'Requests', 'BeautifulSoup', 'SQLAlchemy'],
                github: 'https://github.com/aadilkhan/web-vuln-scanner',
                status: 'Beta'
              },
              {
                title: 'Password Audit Tool',
                description: 'Advanced password strength analyzer with breach database checking and security recommendations.',
                tech: ['Python', 'Hashlib', 'Regex', 'HaveIBeenPwned API'],
                github: 'https://github.com/aadilkhan/password-audit',
                status: 'Completed'
              },
              {
                title: 'Digital Forensics Kit',
                description: 'Collection of digital forensics scripts for evidence gathering, analysis, and reporting.',
                tech: ['Python', 'Volatility', 'Autopsy', 'Sleuth Kit'],
                github: 'https://github.com/aadilkhan/forensics-kit',
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
                title: 'TryHackMe',
                description: 'Practical cybersecurity learning platform',
                progress: 75,
                status: 'In Progress',
                topics: ['Web Security', 'Network Security', 'Linux Fundamentals']
              },
              {
                title: 'Hack The Box',
                description: 'Penetration testing labs and challenges',
                progress: 45,
                status: 'Active',
                topics: ['Penetration Testing', 'System Exploitation', 'CTF Challenges']
              },
              {
                title: 'Google Cybersecurity',
                description: 'Professional cybersecurity certificate program',
                progress: 60,
                status: 'In Progress',
                topics: ['Risk Management', 'Incident Response', 'Security Operations']
              },
              {
                title: 'CompTIA Security+',
                description: 'Foundational cybersecurity certification',
                progress: 30,
                status: 'Preparing',
                topics: ['Security Fundamentals', 'Threat Management', 'Cryptography']
              },
              {
                title: 'OWASP Top 10',
                description: 'Web application security knowledge',
                progress: 80,
                status: 'Completed',
                topics: ['Web Vulnerabilities', 'Secure Coding', 'Application Security']
              },
              {
                title: 'CEH (Preparing)',
                description: 'Certified Ethical Hacker certification',
                progress: 15,
                status: 'Planning',
                topics: ['Ethical Hacking', 'Penetration Testing', 'Security Assessment']
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
                title: 'Getting Started with Kali Linux',
                date: '2024-01-15',
                category: 'Tutorial',
                preview: 'Complete guide to setting up your first penetration testing environment with Kali Linux.',
                readTime: '8 min read'
              },
              {
                title: 'Top 10 Python Scripts for Ethical Hackers',
                date: '2024-01-10',
                category: 'Scripts',
                preview: 'Essential Python scripts every ethical hacker should have in their toolkit.',
                readTime: '12 min read'
              },
              {
                title: 'Mobile App Security: Common Vulnerabilities',
                date: '2024-01-05',
                category: 'Security',
                preview: 'Exploring the most common security flaws in mobile applications and how to prevent them.',
                readTime: '15 min read'
              },
              {
                title: 'Network Reconnaissance with Nmap',
                date: '2024-01-01',
                category: 'Tools',
                preview: 'Advanced Nmap techniques for network discovery and vulnerability scanning.',
                readTime: '10 min read'
              },
              {
                title: 'Web Application Testing Methodology',
                date: '2023-12-28',
                category: 'Methodology',
                preview: 'Step-by-step approach to testing web applications for security vulnerabilities.',
                readTime: '20 min read'
              },
              {
                title: 'Building Your First CTF Lab',
                date: '2023-12-20',
                category: 'Lab Setup',
                preview: 'How to create your own Capture The Flag environment for practicing ethical hacking.',
                readTime: '18 min read'
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
                <span className="text-green-400">$</span> echo "Blog posts coming soon..."
              </p>
              <p className="text-green-400 mt-2">
                Stay tuned for in-depth articles on ethical hacking, cybersecurity tools, and penetration testing techniques.
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
                      href="https://github.com/aadilkhan"
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
                      href="https://linkedin.com/in/aadilkhan"
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
                  Available for cybersecurity collaborations, ethical hacking projects, and app development opportunities.
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
            © 2024 Aadil Khan | Ethical Hacker & Cybersecurity Enthusiast
          </p>
          <p className="text-green-500 text-sm mt-2">
            "In the world of zeros and ones, security is the ultimate challenge."
          </p>
        </div>
      </footer>
    </div>
  );
}
