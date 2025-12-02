# ⚡ DEPLOYMENT CHEAT SHEET

## 🎯 YOUR WORKFLOW

### **Every Time You Update:**

**Your Computer:**
```powershell
npm run build
git add .
git add -f out/
git commit -m "Updated content"
git push origin main
```

**Hostinger (ONE LINE):**
```powershell
ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && git pull origin main && mv out/* . && rm -rf out"
```

**Done! Live in 30 seconds!** ✅

---

## 🔧 ONE-TIME SETUP

### **1. Create GitHub Repository**
- Go to: https://github.com/new
- Name: `portfolio-website`
- Click "Create repository"

### **2. Push Code with Built Files**
```powershell
cd d:\Development\generated\hacker_theme
npm run build
git init
git remote add origin https://github.com/YOUR-USERNAME/portfolio-website.git
git add .
git add -f out/
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

### **3. Setup Hostinger**
```powershell
ssh -p 65002 u284898047@145.79.210.122
# Password: HiJack@110

cd /domains/chillingon.com/public_html/Aadil/
rm -rf *
git clone https://github.com/YOUR-USERNAME/portfolio-website.git .
mv out/* .
rm -rf out
exit
```

---

## 📋 QUICK COMMANDS

**Build:**
```powershell
npm run build
```

**Push:**
```powershell
git add . && git add -f out/ && git commit -m "msg" && git push
```

**Update Server:**
```powershell
ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && git pull && mv out/* ."
```

**All-in-One:**
```powershell
npm run build && git add -f out/ && git commit -am "Updated" && git push && ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && git pull && mv out/* . && echo '✓ Live!'"
```

---

## 🔑 CREDENTIALS

**GitHub:** `YOUR-USERNAME/portfolio-website`  
**SSH:** `ssh -p 65002 u284898047@145.79.210.122`  
**Password:** `HiJack@110`  
**Path:** `/domains/chillingon.com/public_html/Aadil/`  
**Live Site:** `https://aadil.chillingon.com`

---

## 💡 SAVE THIS FUNCTION

Add to PowerShell profile for one-command deploy:

```powershell
function Deploy-Portfolio {
    param([string]$msg = "Updated website")
    npm run build
    git add -f out/
    git commit -am $msg
    git push origin main
    ssh -p 65002 u284898047@145.79.210.122 "cd /domains/chillingon.com/public_html/Aadil/ && git pull && mv out/* . && echo '✓ Live!'"
}
```

**Usage:**
```powershell
Deploy-Portfolio "Updated about page"
```

---

**That's it! Simple as that!** 🚀
