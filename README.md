# 🛡️ Ethical Hacker Portfolio

> A stunning Matrix-themed portfolio website for cybersecurity professionals and ethical hackers.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🎯 Features

- ✨ **Matrix-Inspired Theme** - Authentic hacker aesthetic with green terminal colors
- 🎬 **Smooth Animations** - Typing effects, matrix rain, pulse animations
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile
- 🚀 **Lightning Fast** - Static site generation for optimal performance
- 🔒 **Secure** - Built-in security headers and SSL support
- 📊 **8 Sections** - Complete portfolio showcase
- 🎨 **No Frameworks** - Pure CSS, no heavy dependencies

---

## 📸 Preview

Visit the live demo or see screenshots in the `/screenshots` folder.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.3.2](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Icons**: [RemixIcon 4.5](https://remixicon.com/)
- **Fonts**: Geist Sans & Geist Mono

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

### Build for Production

```bash
# Create optimized production build
npm run build

# The static site will be in the 'out' folder
```

---

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx           # Main portfolio page
│   ├── layout.tsx         # Root layout & metadata
│   ├── globals.css        # Global styles
│   └── not-found.tsx      # 404 error page
├── public/                # Static assets
├── out/                   # Production build (generated)
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── deploy.sh              # Server deployment script
├── deploy.bat             # Local deployment script (Windows)
├── setup-git.bat          # Git initialization script
└── README.md              # This file
```

---

## 📦 Deployment

This portfolio supports multiple deployment methods:

### Option 1: Manual Upload (Simplest)

1. Build: `npm run build`
2. Upload `out` folder contents to your hosting
3. See `QUICK_DEPLOY.md` for detailed steps

### Option 2: FTP Deployment

1. Build locally
2. Use FileZilla to upload `out` folder
3. See `DEPLOYMENT_GUIDE.md` for full guide

### Option 3: Git-Based Deployment (Recommended)

1. Push changes to GitHub
2. Pull on server and rebuild
3. See `GIT_DEPLOYMENT_GUIDE.md` for setup

### Option 4: Automatic with GitHub Actions (Best)

1. Push to GitHub
2. Automatic build & deploy via GitHub Actions
3. Configure secrets in GitHub repository settings
4. See `GIT_DEPLOYMENT_GUIDE.md` for full setup

---

## 🔧 Configuration

### Update Personal Information

Edit `app/page.tsx` to customize:

- Your name and title
- About me section
- Skills and proficiency levels
- Tools you use
- Projects portfolio
- Certifications progress
- Blog posts
- Contact information

### Customize Theme

Edit `app/globals.css` and Tailwind config:

```css
/* Change primary colors */
--color-primary: #00ff00;  /* Matrix green */
--color-background: #000000;  /* Black */
```

### Add Resume

Place your resume PDF in the `public` folder:
```
public/Aadil_Khan_Resume.pdf
```

---

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start dev server at localhost:3000

# Production
npm run build        # Build static site in 'out' folder
npm run lint         # Run ESLint to check code quality

# Deployment (Windows)
.\setup-git.bat      # Initialize Git repository
.\deploy.bat         # Build, commit, and push to GitHub

# Deployment (Linux/Mac)
./deploy.sh          # Pull, build, and deploy on server
```

---

## 🎨 Sections

1. **Home** - Animated terminal greeting
2. **About Me** - Background and mission
3. **Skills** - Technical skills with progress bars
4. **Tools** - Security tools arsenal
5. **Projects** - Portfolio showcase
6. **Certifications** - Learning progress
7. **Blog** - Articles and tutorials
8. **Contact** - Get in touch form

---

## 🔒 Security Features

- HTTPS enforcement via `.htaccess`
- Security headers (XSS, clickjacking, MIME sniffing protection)
- No directory listing
- GZIP compression enabled
- Browser caching optimized
- Static site (no server-side vulnerabilities)

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

---

## 🤝 Contributing

This is a personal portfolio template. Feel free to:

1. Fork the repository
2. Create your feature branch
3. Customize for your needs
4. Share improvements via PR

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📞 Support & Documentation

- **Quick Deploy**: See `QUICK_DEPLOY.md`
- **Full Deployment Guide**: See `DEPLOYMENT_GUIDE.md`
- **Git Workflow**: See `GIT_DEPLOYMENT_GUIDE.md`
- **Deployment Checklist**: See `DEPLOYMENT_CHECKLIST.md`

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [RemixIcon](https://remixicon.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

---

## 📧 Contact

**Aadil Khan**
- Email: aadil.khan@protonmail.com
- GitHub: [@aadilkhan](https://github.com/aadilkhan)
- LinkedIn: [aadilkhan](https://linkedin.com/in/aadilkhan)

---

<div align="center">

**Made with 💚 by ethical hackers, for ethical hackers**

⭐ Star this repo if you find it useful!

</div>
