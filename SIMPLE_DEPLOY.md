# 🚀 SUPER SIMPLE GitHub Deployment

The EASIEST way - just `git push` and `git pull`. No building on server!

---

## 🎯 THE SIMPLE WORKFLOW

```
Your Computer: Build → Push to GitHub
Hostinger: Pull from GitHub → LIVE!
```

**No npm install, no npm build, no moving files!**

---

## ⚡ ONE-TIME SETUP (5 Minutes)

### **STEP 1: Setup on Your Computer**

```powershell
cd d:\Development\generated\hacker_theme

# Build your site
npm run build

# Initialize git (if not already done)
git init
git remote add origin https://github.com/YOUR-USERNAME/portfolio-website.git

# IMPORTANT: Add out folder to git (don't ignore it!)
# Remove out from .gitignore if it exists
# Or just force add it:
git add -f out/

# Add everything else
git add .

# Commit
git commit -m "Portfolio website with built files"

# Push
git branch -M main
git push -u origin main
```

**That's it for your computer!**

---

### **STEP 2: Setup on Hostinger Server**

```powershell
# SSH into Hostinger
ssh -p 65002 u284898047@145.79.210.122
# Password: HiJack@110
```

Then run these commands:

```bash
# Navigate to your web folder
cd /domains/chillingon.com/public_html/Aadil/

# Backup old files (optional)
mkdir ~/backup-$(date +%Y%m%d) 2>/dev/null
cp -r * ~/backup-$(date +%Y%m%d)/ 2>/dev/null

# Clear folder
rm -rf *
rm -rf .* 2>/dev/null

# Clone your repository
git clone https://github.com/YOUR-USERNAME/portfolio-website.git .

# Move built files from out folder to root
mv out/* .
mv out/.* . 2>/dev/null

# Remove source files (keep only website)
rm -rf out app components lib public node_modules .next .git
rm -rf package*.json *.config.* *.md *.bat *.sh

# Initialize git again (to track from GitHub)
git init
git remote add origin https://github.com/YOUR-USERNAME/portfolio-website.git
git fetch origin
git reset --hard origin/main

# Move out folder contents
mv out/* .
mv out/.* . 2>/dev/null
rm -rf out

echo "✓ Setup complete!"
exit
```

**Done! Your site is live at:** https://aadil.chillingon.com

---

## 🔄 DAILY WORKFLOW (Super Easy!)

### **On Your Computer (Every Time You Make Changes):**

```powershell
# 1. Make your changes (edit any files)

# 2. Test locally
npm run dev

# 3. Build
npm run build

# 4. Commit EVERYTHING including out folder
git add .
git add -f out/
git commit -m "Updated about section"

# 5. Push to GitHub
git push origin main
```

---

### **On Hostinger (Update Live Site):**

**Method 1 - Three Commands:**
```powershell
# SSH into server
ssh -p 65002 u284898047@145.79.210.122

# Navigate and pull
cd /domains/chillingon.com/public_html/Aadil/ && git pull origin main && mv out/* . 2>/dev/null && rm -rf out

# Exit
exit
```

**Method 2 - ONE Command (Fastest!):**
```powershell
ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && git pull origin main && mv out/* . 2>/dev/null && rm -rf out && echo '✓ Site updated!'"
```

That's it! No building, no npm install, just pull and live! ✅

---

## 🎯 EVEN SIMPLER SETUP (Alternative)

If you want to avoid the `mv out/*` step entirely:

### **Setup Server to Serve from /out Folder:**

```bash
# SSH into Hostinger
ssh -p 65002 u284898047@145.79.210.122

# Navigate to web folder
cd /domains/chillingon.com/public_html/Aadil/

# Clear and clone
rm -rf *
git clone https://github.com/YOUR-USERNAME/portfolio-website.git .

exit
```

Then create a `.htaccess` file:

```bash
ssh -p 65002 u284898047@145.79.210.122
cd /domains/chillingon.com/public_html/Aadil/

cat > .htaccess << 'EOF'
# Redirect all requests to out folder
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/out/
RewriteRule ^(.*)$ /out/$1 [L]
EOF

exit
```

**Now updates are just:**
```powershell
ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && git pull origin main"
```

**No mv command needed!**

---

## 📝 COMPLETE SIMPLE WORKFLOW

### **Initial Setup (Once):**

```powershell
# On your computer
cd d:\Development\generated\hacker_theme
npm run build
git init
git remote add origin https://github.com/YOUR-USERNAME/portfolio-website.git
git add .
git add -f out/
git commit -m "Initial commit"
git push -u origin main

# On Hostinger
ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && rm -rf * && git clone https://github.com/YOUR-USERNAME/portfolio-website.git . && mv out/* . && rm -rf out && exit"
```

### **Every Update (Daily):**

```powershell
# On your computer
npm run build
git add .
git add -f out/
git commit -m "message"
git push

# On Hostinger (ONE LINE!)
ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && git pull && mv out/* . && rm -rf out"
```

**Total time: 30 seconds!** ⚡

---

## 💡 PRO TIPS

### **Create PowerShell Shortcut:**

Add to your PowerShell profile or save as `update-site.ps1`:

```powershell
# Update website
function Update-Site {
    param([string]$message = "Updated website")
    
    Write-Host "Building..." -ForegroundColor Green
    npm run build
    
    Write-Host "Committing..." -ForegroundColor Green
    git add .
    git add -f out/
    git commit -m $message
    
    Write-Host "Pushing to GitHub..." -ForegroundColor Green
    git push origin main
    
    Write-Host "Updating live site..." -ForegroundColor Green
    ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && git pull origin main && mv out/* . 2>/dev/null && rm -rf out && echo '✓ Live!'"
    
    Write-Host "✓ Done! https://aadil.chillingon.com" -ForegroundColor Cyan
}
```

**Then just run:**
```powershell
Update-Site "Updated about page"
```

**Everything happens automatically!** 🎉

---

## 🎯 THE ABSOLUTE SIMPLEST WORKFLOW

### **Option: Commit Built Files to Separate Branch**

**On your computer:**
```powershell
# Work on main branch
git checkout main
# ... make changes ...
npm run build

# Switch to deploy branch
git checkout -b deploy
git add out/
git commit -m "Deploy"
git push origin deploy

# Back to main
git checkout main
```

**On Hostinger:**
```bash
cd /domains/chillingon.com/public_html/Aadil/
git pull origin deploy
mv out/* .
```

**This keeps source and built files separate!**

---

## ✅ SUMMARY

**The workflow you want:**

1. **Your computer:**
   ```powershell
   npm run build
   git add -f out/
   git commit -m "message"
   git push
   ```

2. **Hostinger:**
   ```powershell
   ssh ... "cd .../Aadil && git pull && mv out/* ."
   ```

3. **Done!** Site is live!

**No npm install, no npm build on server, just pull and go!** ⚡

---

## 🚀 GET STARTED NOW

**First time setup:**

1. **Create GitHub repo:** https://github.com/new (name: `portfolio-website`)

2. **Push with out folder:**
   ```powershell
   cd d:\Development\generated\hacker_theme
   npm run build
   git init
   git remote add origin https://github.com/YOUR-USERNAME/portfolio-website.git
   git add .
   git add -f out/
   git commit -m "Portfolio with built files"
   git push -u origin main
   ```

3. **Setup Hostinger:**
   ```powershell
   ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && rm -rf * && git clone https://github.com/YOUR-USERNAME/portfolio-website.git . && mv out/* . && rm -rf out"
   ```

**That's it! Future updates are just:**
```powershell
npm run build && git add -f out/ && git commit -am "msg" && git push
ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && git pull && mv out/* ."
```

**SUPER SIMPLE!** 🎉
