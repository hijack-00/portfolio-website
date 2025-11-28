# 🚀 Deployment Guide - Hostinger Subdomain

## Overview
This guide will help you deploy your Next.js portfolio to a Hostinger subdomain.

---

## 📋 Prerequisites

1. **Hostinger Account** with active hosting plan
2. **Subdomain Created** (e.g., `portfolio.yourdomain.com`)
3. **FTP/File Manager Access** to your Hostinger account
4. **Node.js** installed locally (for building)

---

## 🎯 Deployment Options

### **Option 1: Static Export (Recommended - Works on All Hostinger Plans)**

Your project is already configured for static export! Follow these steps:

#### Step 1: Build the Static Site

```powershell
# Navigate to project
cd d:\Development\generated\hacker_theme

# Install dependencies (if not already done)
powershell -ExecutionPolicy Bypass -Command "npm install"

# Build the static site
powershell -ExecutionPolicy Bypass -Command "npm run build"
```

This creates an `out` folder with all static files.

#### Step 2: Prepare Files for Upload

After building, you'll have an `out` folder containing:
- `index.html`
- `_next/` folder (CSS, JS, etc.)
- `404.html`
- Other static assets

#### Step 3: Upload to Hostinger

**Method A: Using File Manager (Easiest)**

1. Log in to your Hostinger control panel (hPanel)
2. Navigate to **File Manager**
3. Go to your subdomain's directory (usually `public_html/subdomain_name/`)
4. Upload all files from the `out` folder
5. Make sure `index.html` is in the subdomain root

**Method B: Using FTP (More Control)**

1. Get FTP credentials from Hostinger:
   - Go to **Files → FTP Accounts**
   - Note: hostname, username, password, port
2. Use an FTP client (FileZilla, WinSCP):
   ```
   Host: ftp.yourdomain.com
   Port: 21
   Username: your_ftp_username
   Password: your_ftp_password
   ```
3. Navigate to subdomain folder
4. Upload entire `out` folder contents

#### Step 4: Configure Subdomain

1. In Hostinger hPanel, go to **Domains → Subdomains**
2. Create subdomain (e.g., `portfolio.yourdomain.com`)
3. Point it to the correct directory where you uploaded files
4. Wait 5-15 minutes for DNS propagation

#### Step 5: Test Your Site

Visit `https://portfolio.yourdomain.com` and verify everything works!

---

### **Option 2: Node.js Hosting (For Premium/Business Plans)**

If your Hostinger plan supports Node.js:

#### Step 1: Setup Node.js App

1. Log in to Hostinger hPanel
2. Go to **Advanced → Node.js**
3. Create new Node.js application:
   - **Node.js version**: 18.x or higher
   - **Application mode**: Production
   - **Application root**: Your subdomain folder
   - **Application startup file**: `server.js`

#### Step 2: Modify for Node.js Deployment

Remove static export from `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove: output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

#### Step 3: Create Server File

Create `server.js` in project root:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

#### Step 4: Upload & Deploy

1. Upload all project files via FTP/File Manager
2. SSH into server and run:
   ```bash
   npm install
   npm run build
   pm2 start server.js --name portfolio
   ```

---

## 🔧 Troubleshooting

### Issue: 404 Errors on Routes

**Solution**: Add `.htaccess` file in subdomain root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Issue: Assets Not Loading

**Solution**: Check file permissions (should be 644 for files, 755 for folders)

```bash
# Via SSH
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
```

### Issue: Slow Loading

**Solution**: Enable compression in `.htaccess`:

```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

## 📱 Post-Deployment Checklist

- [ ] Site loads correctly on subdomain
- [ ] All sections scroll properly
- [ ] Animations work (typing effect, matrix rain)
- [ ] All links function
- [ ] Mobile responsive
- [ ] HTTPS enabled (Hostinger provides free SSL)
- [ ] Resume PDF accessible (upload to `out` folder before deployment)

---

## 🔒 Enable SSL/HTTPS

1. In Hostinger hPanel, go to **Security → SSL**
2. Select your subdomain
3. Enable SSL certificate (free)
4. Wait 10-15 minutes for activation
5. Force HTTPS redirect by adding to `.htaccess`:

```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 🔄 Updating Your Site

When you make changes:

1. Make changes locally
2. Test: `npm run dev`
3. Build: `npm run build`
4. Upload new `out` folder contents to Hostinger
5. Clear browser cache and test

---

## 📞 Need Help?

- **Hostinger Support**: Available 24/7 via live chat
- **Documentation**: help.hostinger.com
- **Community**: Hostinger Community Forum

---

## ✅ Quick Command Reference

```powershell
# Local Development
npm run dev                     # Start dev server

# Build for Production
npm run build                   # Create static export in 'out' folder

# Install Dependencies
npm install                     # Install all packages

# Lint Code
npm run lint                    # Check for errors
```

---

**Your portfolio is ready to go live! 🎉**
