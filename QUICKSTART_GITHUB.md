# 🎯 Quick Start: GitHub Deployment

The fastest way to deploy your portfolio via GitHub.

---

## 📋 STEP 1: Push to GitHub (One-Time Setup)

```powershell
# In your project folder
cd d:\Development\generated\hacker_theme

# Initialize git (if needed)
git init
git remote add origin https://github.com/YOUR-USERNAME/portfolio-website.git

# Push code
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git push -u origin main
```

**Create repo first at:** https://github.com/new

---

## 📋 STEP 2: Setup Hostinger Server (One-Time)

### **Option A: Copy-Paste Setup (Easiest - 5 minutes)**

```powershell
# SSH into Hostinger
ssh -p 65002 u284898047@145.79.210.122
# Password: HiJack@110
```

Then copy-paste this entire block:

```bash
# Navigate to web folder
cd /domains/chillingon.com/public_html/Aadil/

# Backup and clear
mkdir ~/backup-$(date +%Y%m%d) 2>/dev/null
cp -r * ~/backup-$(date +%Y%m%d)/ 2>/dev/null
rm -rf *

# Install Node.js (if not installed)
if ! command -v node &> /dev/null; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    source ~/.bashrc
    nvm install 18
    nvm use 18
fi

# Clone repository (REPLACE WITH YOUR GITHUB URL!)
git clone https://github.com/YOUR-USERNAME/portfolio-website.git .

# Build website
npm install
npm run build

# Deploy built files
mv out/* .
rm -rf out app components lib public node_modules .next
rm -rf package*.json *.config.* *.md *.bat *.sh

echo "✓ Setup complete! Visit: https://aadil.chillingon.com"
exit
```

✅ **Done! Your site is live!**

---

### **Option B: Using Helper Script (Easier Updates)**

```bash
# SSH into server
ssh -p 65002 u284898047@145.79.210.122

# Navigate to folder
cd /domains/chillingon.com/public_html/Aadil/

# Clone repository
git clone https://github.com/YOUR-USERNAME/portfolio-website.git .

# Build
npm install
npm run build

# Copy update script
cat > update.sh << 'EOF'
#!/bin/bash
cd /domains/chillingon.com/public_html/Aadil/
git pull origin main
npm install --production
npm run build
rm -f index.html 404.html
rm -rf _next
mv out/* .
rm -rf out
echo "✓ Updated! https://aadil.chillingon.com"
EOF

# Make executable
chmod +x update.sh

# Deploy
mv out/* .
rm -rf out

# Exit
exit
```

---

## 🔄 STEP 3: Daily Workflow

### **On Your Computer:**

```powershell
# Make changes
# ... edit files ...

# Test locally
npm run dev

# Push to GitHub
git add .
git commit -m "Updated about section"
git push origin main
```

---

### **On Hostinger (Update Live Site):**

**Method 1 - Manual Commands:**
```powershell
ssh -p 65002 u284898047@145.79.210.122
cd /domains/chillingon.com/public_html/Aadil/
git pull origin main
npm run build
rm -f index.html 404.html && rm -rf _next && mv out/* . && rm -rf out
exit
```

**Method 2 - Using Script (if you set it up):**
```powershell
ssh -p 65002 u284898047@145.79.210.122
cd /domains/chillingon.com/public_html/Aadil/
./update.sh
exit
```

---

## ⚡ FASTEST METHOD: One-Line Update

After initial setup, updating is ONE command:

```powershell
ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && git pull origin main && npm run build && rm -f index.html 404.html && rm -rf _next && mv out/* . && rm -rf out && echo '✓ Updated!'"
```

**Save this as a bookmark or shortcut!**

---

## 📝 QUICK REFERENCE

**Your Credentials:**
```
GitHub: YOUR-USERNAME/portfolio-website
SSH: ssh -p 65002 u284898047@145.79.210.122
Password: HiJack@110
Path: /domains/chillingon.com/public_html/Aadil/
Site: https://aadil.chillingon.com
```

**Common Commands:**
```bash
# Push changes
git add . && git commit -m "msg" && git push

# Update server
ssh -p 65002 u284898047@145.79.210.122
cd /domains/chillingon.com/public_html/Aadil/
git pull && npm run build && mv out/* . && exit

# Check site
https://aadil.chillingon.com
```

---

## ✅ THAT'S IT!

**Your workflow:**
1. Edit code locally
2. Push to GitHub
3. Pull on Hostinger
4. Live!

**Total time per update: ~2 minutes!**

---

For detailed instructions, see:
- **GITHUB_DEPLOYMENT_GUIDE.md** - Full documentation
- **MANUAL_DEPLOYMENT_GUIDE.md** - FTP method

**You're all set!** 🚀
