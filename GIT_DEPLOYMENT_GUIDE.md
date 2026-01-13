# 🔄 Git-Based Deployment Guide

This guide will help you set up automatic deployment using Git. Push changes to GitHub, then pull and deploy on Hostinger!

---

## 📋 Overview

**Workflow:**
1. Make changes locally
2. Run `deploy.bat` (builds + commits + pushes to GitHub)
3. SSH into Hostinger
4. Run `./deploy.sh` (pulls + builds + deploys)

Or set up **automatic deployment** with Git hooks!

---

## 🎯 Initial Setup

### Step 1: Initialize Git Repository Locally

```powershell
# Navigate to project
cd d:\Development\generated\hacker_theme

# Initialize git (if not already done)
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Portfolio website"
```

### Step 2: Create GitHub Repository

1. **Go to GitHub**: https://github.com/new
2. **Create new repository**:
   - Name: `portfolio-website` (or your choice)
   - Description: "Personal ethical hacker portfolio"
   - Visibility: Public or Private
   - **DON'T** initialize with README (we already have files)
3. **Click "Create repository"**

### Step 3: Connect Local to GitHub

```powershell
# Add remote (replace with YOUR repository URL)
git remote add origin https://github.com/hijack-00/portfolio-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** You'll need to authenticate. Use:
- Personal Access Token (recommended)
- SSH key
- GitHub Desktop

---

## 🚀 Hostinger Server Setup

### Option A: SSH Access (Required for Git)

#### 1. Enable SSH in Hostinger

1. Login to **hPanel**
2. Go to **Advanced → SSH Access**
3. **Enable SSH** for your account
4. Note your:
   - **Hostname**: `ssh.yourdomain.com` or IP
   - **Username**: Usually your hosting username
   - **Port**: Usually 22 or 65002
   - **Password**: Your hosting password

#### 2. Connect via SSH

**Windows (PowerShell):**
```powershell
ssh username@ssh.yourdomain.com -p 22
```

**Or use PuTTY:**
- Download: https://www.putty.org
- Enter hostname, port, username
- Click "Open" and enter password

#### 3. Install Node.js on Server (if not available)

```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload shell
source ~/.bashrc

# Install Node.js
nvm install 18
nvm use 18
```

**Note:** Some Hostinger plans don't support Node.js. Check your plan or contact support.

---

## 📂 Server Deployment Setup

### Step 1: Clone Repository on Server

```bash
# SSH into your Hostinger server first
ssh username@ssh.yourdomain.com -p 22

# Navigate to home directory
cd ~

# Create a directory for your project
mkdir -p portfolio

# Clone your repository
cd portfolio
git clone https://github.com/YOUR_USERNAME/portfolio-website.git .

# Install dependencies
npm install
```

### Step 2: Configure Deployment Script

Edit the `deploy.sh` file variables:

```bash
# Edit deploy.sh
nano deploy.sh
```

Update these lines:
```bash
REPO_URL="https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
PROJECT_DIR="/home/YOUR_USERNAME/portfolio"
PUBLIC_DIR="/home/YOUR_USERNAME/domains/subdomain.domain.com/public_html"
```

Make it executable:
```bash
chmod +x deploy.sh
```

### Step 3: Initial Build

```bash
# Build the site
npm run build

# Copy to public directory
cp -r out/* /home/YOUR_USERNAME/domains/subdomain.domain.com/public_html/

# Set permissions
find /home/YOUR_USERNAME/domains/subdomain.domain.com/public_html -type f -exec chmod 644 {} \;
find /home/YOUR_USERNAME/domains/subdomain.domain.com/public_html -type d -exec chmod 755 {} \;
```

---

## 🔄 Daily Workflow

### On Your Local Machine (Windows)

**Option 1: Use deploy.bat (Recommended)**

```powershell
# Double-click deploy.bat or run:
.\deploy.bat
```

This will:
1. ✅ Build your site
2. ✅ Stage all changes
3. ✅ Commit with your message
4. ✅ Push to GitHub

**Option 2: Manual Commands**

```powershell
# Build
npm run build

# Commit and push
git add .
git commit -m "Update portfolio content"
git push origin main
```

### On Hostinger Server

**SSH into server and run:**

```bash
# Connect via SSH
ssh username@ssh.yourdomain.com -p 22

# Navigate to project
cd ~/portfolio

# Run deployment script
./deploy.sh
```

**That's it!** Your changes are now live! 🎉

---

## ⚡ Automatic Deployment (Advanced)

### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Hostinger via FTP
      uses: SamKirkland/FTP-Deploy-Action@4.3.3
      with:
        server: ftp.yourdomain.com
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./out/
        server-dir: /domains/subdomain.domain.com/public_html/
```

**Setup:**
1. Go to GitHub → Your Repo → Settings → Secrets
2. Add:
   - `FTP_USERNAME`: Your FTP username
   - `FTP_PASSWORD`: Your FTP password
3. Push to main branch
4. GitHub automatically builds and deploys!

### Option 2: Cron Job on Server

```bash
# Edit crontab
crontab -e

# Add this line to check for updates every 5 minutes
*/5 * * * * cd ~/portfolio && git pull origin main && npm run build && cp -r out/* /path/to/public_html/ 2>&1 | logger -t portfolio-deploy
```

**Note:** This pulls every 5 minutes. Adjust as needed.

### Option 3: Git Webhook

1. **Create webhook script** on server (`webhook.php`):

```php
<?php
$secret = "your_secret_key_here";
$payload = file_get_contents('php://input');
$signature = hash_hmac('sha256', $payload, $secret);

if ("sha256=" . $signature === $_SERVER['HTTP_X_HUB_SIGNATURE_256']) {
    exec('cd ~/portfolio && ./deploy.sh > /tmp/deploy.log 2>&1 &');
    echo "Deployment triggered!";
} else {
    http_response_code(403);
    echo "Invalid signature";
}
?>
```

2. **Set up webhook in GitHub**:
   - Go to Repo → Settings → Webhooks
   - Add webhook URL: `https://yoursubdomain.com/webhook.php`
   - Secret: Your secret key
   - Events: Just the push event
   - Click "Add webhook"

3. **Every push auto-deploys!**

---

## 🔒 Security Best Practices

### 1. Use SSH Keys Instead of Passwords

**Generate SSH key on local machine:**
```powershell
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

**Copy public key to server:**
```powershell
type $env:USERPROFILE\.ssh\id_rsa.pub | ssh username@server "cat >> ~/.ssh/authorized_keys"
```

**Now you can SSH without password!**

### 2. Use Environment Variables

Create `.env.local` (already ignored by Git):
```env
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_KEY=your_secret_here
```

Never commit sensitive data!

### 3. Private Repository

Consider making your GitHub repository private if it contains:
- API keys
- Email addresses
- Private configurations

---

## 📊 Deployment Scripts Reference

### deploy.bat (Windows - Local)
- Builds site
- Commits changes
- Pushes to GitHub

### deploy.sh (Linux/Hostinger - Server)
- Pulls from GitHub
- Installs dependencies
- Builds site
- Copies to public directory
- Sets permissions

---

## 🆘 Troubleshooting

### SSH Connection Refused
**Fix:**
- Check SSH is enabled in hPanel
- Verify port number (usually 22 or 65002)
- Check firewall settings

### Git Pull Fails on Server
**Fix:**
```bash
# Reset to remote state
git fetch origin
git reset --hard origin/main
```

### Node.js Not Available on Server
**Options:**
1. Contact Hostinger support to enable Node.js
2. Use GitHub Actions to build and FTP deploy
3. Build locally and FTP the `out` folder

### Build Fails on Server (Out of Memory)
**Fix:**
- Build locally with GitHub Actions
- Use FTP deployment instead
- Upgrade hosting plan

### Permission Denied
**Fix:**
```bash
chmod +x deploy.sh
chmod 755 ~/portfolio
```

---

## 🎯 Quick Command Reference

### Local (Windows)
```powershell
# Build and deploy
.\deploy.bat

# Manual git
git add .
git commit -m "message"
git push origin main
```

### Server (SSH)
```bash
# Connect
ssh user@host -p 22

# Deploy
cd ~/portfolio
./deploy.sh

# Manual deployment
git pull origin main
npm install
npm run build
cp -r out/* /path/to/public_html/
```

---

## ✅ Deployment Checklist

- [ ] Git initialized locally
- [ ] GitHub repository created
- [ ] Local repo connected to GitHub
- [ ] SSH access enabled on Hostinger
- [ ] Node.js installed on server
- [ ] Repository cloned on server
- [ ] `deploy.sh` configured with correct paths
- [ ] `deploy.sh` made executable
- [ ] Initial build successful on server
- [ ] `deploy.bat` working locally
- [ ] Test full workflow (local change → push → server pull → deploy)
- [ ] (Optional) GitHub Actions configured
- [ ] (Optional) Webhook set up

---

## 🚀 Your Workflow After Setup

1. **Make changes** to your code locally
2. **Run** `deploy.bat`
3. **SSH** into Hostinger
4. **Run** `./deploy.sh`
5. **Done!** Changes are live! 🎉

Or with automation:
1. **Make changes** locally
2. **Run** `deploy.bat`
3. **Wait** for GitHub Actions
4. **Done!** Auto-deployed! 🚀

---

## 📞 Need Help?

- **Git Issues**: https://git-scm.com/doc
- **GitHub Actions**: https://docs.github.com/en/actions
- **Hostinger SSH**: help.hostinger.com/en/articles/1583245-how-to-use-ssh
- **Node.js**: https://nodejs.org/docs

---

**Happy deploying! 🎉**

Your portfolio will stay up-to-date with just a few commands!
