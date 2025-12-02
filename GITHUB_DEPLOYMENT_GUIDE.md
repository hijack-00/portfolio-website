# 🚀 GitHub-Based Deployment to Hostinger - Complete Guide

Deploy your portfolio using GitHub with automatic or manual pulls on Hostinger server.

---

## 📋 What You'll Need

- ✅ GitHub account
- ✅ Git installed on your computer
- ✅ Hostinger SSH access
- ✅ Your portfolio code ready

---

## 🎯 DEPLOYMENT METHODS

### **Method A: GitHub + Manual Pull** (Recommended - Simpler)
- Push code to GitHub from your computer
- SSH into Hostinger and pull latest changes
- **Best for:** Full control, easy to understand

### **Method B: GitHub Actions + FTP** (Automatic)
- Push code to GitHub
- GitHub automatically builds and uploads to Hostinger
- **Best for:** Hands-free deployment (requires GitHub Actions setup)

We'll cover **Method A** first (simpler and works with current billing situation).

---

## 📦 METHOD A: GITHUB + MANUAL PULL

### **STEP 1: Push Your Code to GitHub**

#### **1.1 Create GitHub Repository**

1. **Go to:** https://github.com/new

2. **Fill in:**
   - Repository name: `portfolio-website`
   - Description: "My IT Consultant Portfolio"
   - Visibility: **Private** or **Public** (your choice)
   - **Don't** check "Initialize with README"

3. **Click:** "Create repository"

4. **Keep this page open** - you'll need the URLs shown

---

#### **1.2 Initialize Git Locally (If Not Already Done)**

Open PowerShell in your project folder:

```powershell
cd d:\Development\generated\hacker_theme

# Check if git is initialized
git status
```

**If you see "not a git repository":**

```powershell
# Initialize git
git init

# Add remote (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR-USERNAME/portfolio-website.git

# Verify remote added
git remote -v
```

**If git already exists:**

```powershell
# Update remote URL
git remote set-url origin https://github.com/YOUR-USERNAME/portfolio-website.git
```

---

#### **1.3 Push Code to GitHub**

```powershell
# Add all files
git add .

# Commit with message
git commit -m "Portfolio website - removed cybersecurity content"

# Push to GitHub
git branch -M main
git push -u origin main
```

**If asked for credentials:**
- Username: Your GitHub username
- Password: Your GitHub **Personal Access Token** (not your password)

**Don't have a token?** Create one:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control)
4. Click "Generate token"
5. **Copy token** and save it somewhere safe
6. Use token as password when pushing

✅ **Your code is now on GitHub!**

---

### **STEP 2: Setup Hostinger Server**

#### **2.1 SSH into Hostinger**

```powershell
ssh -p 65002 u284898047@145.79.210.122
```

**Password:** `HiJack@110`

---

#### **2.2 Navigate to Your Website Folder**

```bash
cd /domains/chillingon.com/public_html/Aadil/
```

---

#### **2.3 Clear Old Files**

```bash
# Backup old files (optional)
mkdir ~/backup-$(date +%Y%m%d)
cp -r * ~/backup-$(date +%Y%m%d)/ 2>/dev/null

# Clear current folder
rm -rf *
```

---

#### **2.4 Install Node.js on Hostinger (If Not Installed)**

Check if Node.js is available:

```bash
node --version
npm --version
```

**If not installed, use NVM:**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Load nvm
source ~/.bashrc

# Install Node.js 18
nvm install 18
nvm use 18

# Verify
node --version
npm --version
```

---

#### **2.5 Clone Repository from GitHub**

```bash
# Clone your repository (use YOUR GitHub URL)
git clone https://github.com/YOUR-USERNAME/portfolio-website.git .

# Note: The . at the end clones into current directory
```

**If prompted for credentials:**
- Username: Your GitHub username
- Password: Your Personal Access Token

---

#### **2.6 Install Dependencies**

```bash
npm install
```

**This may take 2-3 minutes**

---

#### **2.7 Build the Website**

```bash
npm run build
```

**Wait for build to complete** (~1 minute)

---

#### **2.8 Move Built Files to Root**

```bash
# Move contents of 'out' folder to current directory
mv out/* .
mv out/.* . 2>/dev/null

# Remove source files (keep only built site)
rm -rf app components lib public node_modules .next
rm -rf package.json package-lock.json next.config.ts tsconfig.json tailwind.config.ts
rm -rf *.md *.bat *.sh
```

Now your folder contains only the built website!

---

#### **2.9 Exit SSH**

```bash
exit
```

---

### **STEP 3: Test Your Website**

Visit: **https://aadil.chillingon.com**

Press **Ctrl+Shift+R** to force refresh

✅ **Your website should be live!**

---

## 🔄 UPDATING VIA GITHUB (FUTURE CHANGES)

Whenever you make changes:

### **On Your Computer:**

```powershell
# 1. Make your changes (edit files)

# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Updated about section"

# 4. Push to GitHub
git push origin main
```

---

### **On Hostinger Server:**

```powershell
# 1. SSH into server
ssh -p 65002 u284898047@145.79.210.122

# 2. Navigate to website folder
cd /domains/chillingon.com/public_html/Aadil/

# 3. Pull latest changes
git pull origin main

# 4. Rebuild
npm run build

# 5. Move new files
rm -f index.html 404.html
rm -rf _next
mv out/* .

# 6. Exit
exit
```

✅ **Changes are now live!**

---

## 🤖 METHOD B: AUTOMATED WITH GITHUB ACTIONS (Optional)

This method auto-deploys on every push to GitHub.

### **Requirements:**
- GitHub account without billing issues
- OR use GitHub Actions free tier (2000 minutes/month for private repos, unlimited for public)

### **Setup:**

#### **Step 1: Make Repository Public (For Free Unlimited Actions)**

1. Go to: `https://github.com/YOUR-USERNAME/portfolio-website/settings`
2. Scroll to "Danger Zone"
3. Click "Change visibility" → "Make public"
4. Confirm

---

#### **Step 2: Add GitHub Secrets**

1. Go to: `https://github.com/YOUR-USERNAME/portfolio-website/settings/secrets/actions`

2. Click "New repository secret"

3. Add these 4 secrets:

**Secret 1:**
```
Name: FTP_SERVER
Value: 145.79.210.122
```

**Secret 2:**
```
Name: FTP_USERNAME
Value: u284898047.chillingon.com
```

**Secret 3:**
```
Name: FTP_PASSWORD
Value: HiJack@110
```

**Secret 4:**
```
Name: FTP_SERVER_DIR
Value: /domains/chillingon.com/public_html/Aadil/
```

---

#### **Step 3: Create GitHub Actions Workflow**

Create file: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build website
      run: npm run build
    
    - name: Deploy to Hostinger via FTP
      uses: SamKirkland/FTP-Deploy-Action@4.3.0
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        server-dir: ${{ secrets.FTP_SERVER_DIR }}
        local-dir: ./out/
        port: 65002
```

---

#### **Step 4: Commit and Push**

```powershell
git add .github/workflows/deploy.yml
git commit -m "Add automated deployment"
git push origin main
```

---

#### **Step 5: Monitor Deployment**

1. Go to: `https://github.com/YOUR-USERNAME/portfolio-website/actions`
2. Click on the running workflow
3. Watch it build and deploy
4. Green checkmark = Success! ✅

✅ **Now every push auto-deploys!**

---

## 📊 COMPARISON

| Method | Ease | Speed | Cost |
|--------|------|-------|------|
| **GitHub + Manual Pull** | Medium | 2-3 min | Free |
| **GitHub Actions + FTP** | Easy | 2-3 min | Free (public repo) |
| **Manual FTP** | Hard | 5 min | Free |

---

## 🎯 RECOMMENDED WORKFLOW

**For You (GitHub + Manual Pull):**

1. **Daily work:**
   ```powershell
   # Edit code
   npm run dev  # Test
   git add .
   git commit -m "message"
   git push origin main
   ```

2. **Deploy (when ready):**
   ```powershell
   ssh -p 65002 u284898047@145.79.210.122
   cd /domains/chillingon.com/public_html/Aadil/
   git pull origin main
   npm run build
   rm -f index.html 404.html && rm -rf _next && mv out/* .
   exit
   ```

3. **Visit site:**
   ```
   https://aadil.chillingon.com
   ```

---

## 🆘 TROUBLESHOOTING

### **Problem: Git clone fails on Hostinger**

**Solution:**
```bash
# Use SSH URL instead of HTTPS
git clone git@github.com:YOUR-USERNAME/portfolio-website.git .
```

Or setup Git Personal Access Token

---

### **Problem: npm install fails**

**Solution:**
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

### **Problem: Build fails on Hostinger**

**Solution:**
```bash
# Check Node.js version (needs 18+)
node --version

# If too old, update via nvm
nvm install 18
nvm use 18
```

---

### **Problem: GitHub Actions fails**

**Solution:**
- Check all 4 secrets are added correctly
- Verify FTP credentials are correct
- Check FTP_SERVER_DIR ends with `/`
- Make repo public for free unlimited minutes

---

## ✅ QUICK REFERENCE

### **Your GitHub Setup:**

```
Repository: portfolio-website
Branch: main
Local: d:\Development\generated\hacker_theme
Remote: https://github.com/YOUR-USERNAME/portfolio-website.git
```

### **Hostinger Paths:**

```
SSH: ssh -p 65002 u284898047@145.79.210.122
Password: HiJack@110
Web Root: /domains/chillingon.com/public_html/Aadil/
```

### **Commands:**

```bash
# Push code
git add . && git commit -m "msg" && git push origin main

# Deploy on server
ssh -p 65002 u284898047@145.79.210.122
cd /domains/chillingon.com/public_html/Aadil/
git pull && npm run build && mv out/* . && exit

# Check live site
https://aadil.chillingon.com
```

---

## 🎉 SUCCESS!

Your GitHub-based deployment is ready!

**Workflow:**
1. Edit code → Test → Push to GitHub
2. SSH to Hostinger → Pull → Build → Live!

**Or with GitHub Actions:**
1. Edit code → Test → Push to GitHub
2. Wait 2 minutes → Automatically live!

---

**You now have full control via GitHub!** 🚀
