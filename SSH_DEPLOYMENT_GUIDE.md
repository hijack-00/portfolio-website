# 🚀 Automated Git-Based Deployment - Complete Guide

## Overview
This setup allows you to deploy with a single command:
```powershell
.\deploy-live.bat
```

**What it does:**
1. Builds your site (`npm run build`)
2. Commits built files to `portfolio-live` repo
3. SSH into Hostinger and pulls latest changes
4. Your site is LIVE! ✅

---

## 📋 Complete Setup Instructions

### Step 1: Create `portfolio-live` Repository

1. **Go to**: https://github.com/new
2. **Repository name**: `portfolio-live`
3. **Description**: "Built portfolio site for deployment"
4. **Visibility**: Public or Private (your choice)
5. **Don't check** "Initialize with README"
6. **Click**: "Create repository"

---

### Step 2: Initialize `out` Folder with Git

```powershell
# Build your site
npm run build

# Go to out folder
cd out

# Initialize git
git init

# Add remote
git remote add origin https://github.com/hijack-00/portfolio-live.git

# Add and commit files
git add .
git commit -m "Initial deployment"

# Push to GitHub
git branch -M main
git push -u origin main --force

# Go back to main folder
cd ..
```

---

### Step 3: Setup on Hostinger Server

**SSH into your server:**
```powershell
ssh -p 65002 u284898047@145.79.210.122
# Password: HiJack@110
```

**On the server, run:**
```bash
# Navigate to subdomain folder
cd domains/chillingon.com/public_html/Aadil/

# Backup any existing files (if needed)
# ls -la

# Clear folder (CAREFUL!)
rm -rf *
rm -rf .htaccess

# Clone portfolio-live repo
git clone https://github.com/hijack-00/portfolio-live.git .

# Verify files
ls -la
# Should see: index.html, 404.html, _next/, etc.

# Exit
exit
```

---

### Step 4: Test Your Site

Visit: **https://aadil.chillingon.com**

Your portfolio should be live! 🎉

---

### Step 5: Setup SSH Keys (Optional - No More Passwords!)

**On your computer:**
```powershell
# Generate SSH key (if you don't have one)
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# Press Enter for all prompts (accept defaults)

# Copy your public key
type $env:USERPROFILE\.ssh\id_rsa.pub
# Copy the entire output
```

**On Hostinger server:**
```bash
# SSH into server
ssh -p 65002 u284898047@145.79.210.122

# Create .ssh folder
mkdir -p ~/.ssh

# Add your public key
nano ~/.ssh/authorized_keys
# Paste your public key, then:
# Ctrl+X, Y, Enter to save

# Set correct permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Exit
exit
```

**Test passwordless SSH:**
```powershell
ssh -p 65002 u284898047@145.79.210.122
# Should connect without asking for password! ✅
```

---

## 🎯 Your Daily Workflow

After setup, deploying is ONE command:

```powershell
.\deploy-live.bat
```

**That's it!** The script:
1. ✅ Builds your site
2. ✅ Commits to portfolio-live repo
3. ✅ Pushes to GitHub
4. ✅ SSH into Hostinger
5. ✅ Pulls latest changes
6. ✅ Site is LIVE!

**Total time: ~30 seconds!**

---

## 📂 Repository Structure

You'll have **2 repositories**:

### **1. portfolio-website** (Source Code)
```
portfolio-website/
├── app/              ← Your React/Next.js code
├── public/           ← Static assets
├── package.json      ← Dependencies
└── ...               ← All source files
```
**Purpose**: Your development workspace

### **2. portfolio-live** (Built Site)
```
portfolio-live/
├── index.html        ← Compiled homepage
├── 404.html          ← Error page
├── _next/            ← Compiled JS/CSS
└── ...               ← All built files
```
**Purpose**: What gets deployed to Hostinger

---

## 🔄 Workflow Diagram

```
LOCAL MACHINE:
1. Edit source code (app/page.tsx, etc.)
   ↓
2. Run: .\deploy-live.bat
   ↓
3. Builds site → out/
   ↓
4. Commits out/ → portfolio-live repo
   ↓
5. Pushes to GitHub

GITHUB:
portfolio-live repo updated ✅

HOSTINGER (via SSH):
6. Script runs: git pull
   ↓
7. Downloads latest from portfolio-live
   ↓
8. Site updated!

RESULT:
https://aadil.chillingon.com shows your changes! 🎉
```

---

## 🛠️ Manual Deployment (If Script Fails)

If `deploy-live.bat` has issues:

```powershell
# 1. Build
npm run build

# 2. Commit and push built site
cd out
git add .
git commit -m "Updated portfolio"
git push origin main
cd ..

# 3. Update live site
ssh -p 65002 u284898047@145.79.210.122
# Enter password: HiJack@110
cd domains/chillingon.com/public_html/Aadil
git pull
exit
```

---

## 🔧 Troubleshooting

### **Issue: SSH asks for password every time**
**Fix**: Setup SSH keys (see Step 5 above)

### **Issue: Git push fails from out/ folder**
**Fix**:
```powershell
cd out
git remote -v
# Should show: https://github.com/hijack-00/portfolio-live.git

# If not, fix it:
git remote remove origin
git remote add origin https://github.com/hijack-00/portfolio-live.git
git push -u origin main --force
cd ..
```

### **Issue: Changes not showing on live site**
**Fix**:
```bash
# SSH in and manually pull
ssh -p 65002 u284898047@145.79.210.122
cd /public_html/aadil
git status
git pull --force
exit
```

### **Issue: "Permission denied" on SSH**
**Fix**: Check credentials are correct:
- Host: `145.79.210.122`
- Port: `65002`
- User: `u284898047`
- Pass: `HiJack@110`

### **Issue: Build fails**
**Fix**:
```powershell
# Clean build
rm -rf .next
rm -rf out
npm run build
```

---

## ✅ Verification Checklist

**After Setup:**
- [ ] Created `portfolio-live` repo on GitHub
- [ ] Initialized git in `out/` folder
- [ ] Pushed `out/` to `portfolio-live` repo
- [ ] SSH'd into Hostinger successfully
- [ ] Cloned `portfolio-live` to `/public_html/aadil/`
- [ ] Site loads at `https://aadil.chillingon.com`
- [ ] `deploy-live.bat` script created
- [ ] Tested deployment with script
- [ ] (Optional) SSH keys configured

**Each Deployment:**
- [ ] Make changes to source code
- [ ] Test locally: `npm run dev`
- [ ] Run: `.\deploy-live.bat`
- [ ] Enter commit message
- [ ] Wait ~30 seconds
- [ ] Verify changes on live site

---

## 📝 Important Notes

### **About the `out` Folder**
- Next.js **deletes and recreates** `out` on every build
- But `.git` folder **persists** (it's hidden)
- So git history is maintained

### **Two Repos is Normal**
- **Source repo** = Your code (for development)
- **Deploy repo** = Built files (for hosting)
- This is a common pattern!

### **SSH Connection**
- **Port**: 65002 (not standard 22!)
- **Always specify**: `ssh -p 65002 ...`

### **File Permissions**
- Hostinger automatically sets correct permissions
- No need to manually `chmod`

---

## 🚀 Quick Reference

**Deploy Command:**
```powershell
.\deploy-live.bat
```

**SSH Command:**
```powershell
ssh -p 65002 u284898047@145.79.210.122
```

**GitHub Repos:**
- Source: https://github.com/hijack-00/portfolio-website
- Deploy: https://github.com/hijack-00/portfolio-live

**Live Site:**
```
https://aadil.chillingon.com
```

---

## 🎉 Success!

Your automated deployment is ready!

**Workflow:**
1. Edit code
2. `.\deploy-live.bat`
3. Wait 30 seconds
4. Live! ✅

**No more manual uploads! No more FTP! Just code and deploy!** 🚀
