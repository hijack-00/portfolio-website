# 🚀 One-Time Server Setup - Quick Guide

## What This Does

The `setup-server.sh` script automatically:
- ✅ Navigates to your subdomain folder
- ✅ Preserves `.git` folder if it exists
- ✅ Removes all other files
- ✅ Clones or pulls your portfolio-live repo
- ✅ Sets up your live site

**Run this ONCE on your Hostinger server to set everything up!**

---

## How to Use

### **Step 1: Upload Script to Server**

**Option A: Copy-Paste (Easiest)**

1. **SSH into server:**
   ```powershell
   ssh -p 65002 u284898047@145.79.210.122
   ```
   Password: `HiJack@110`

2. **Create the script:**
   ```bash
   nano setup-server.sh
   ```

3. **Copy the content from `setup-server.sh` file and paste it**
   - Right-click to paste in terminal
   - Press `Ctrl+X`, then `Y`, then `Enter` to save

4. **Make it executable:**
   ```bash
   chmod +x setup-server.sh
   ```

5. **Run it:**
   ```bash
   ./setup-server.sh
   ```

---

**Option B: Using SCP (Upload from Windows)**

```powershell
# From your project folder
scp -P 65002 setup-server.sh u284898047@145.79.210.122:~/
```

Then SSH in and run:
```bash
ssh -p 65002 u284898047@145.79.210.122
chmod +x setup-server.sh
./setup-server.sh
```

---

## Quick Copy-Paste Commands

**All in one - Just paste this into SSH:**

```bash
cd ~
cat > setup-server.sh << 'EOF'
#!/bin/bash

echo "========================================="
echo "  Hostinger Server Setup"
echo "========================================="
echo ""

# Navigate to subdomain folder
echo "Navigating to subdomain folder..."
cd domains/chillingon.com/public_html/Aadil/

# Check if git repository already exists
if [ -d ".git" ]; then
    echo "Git repository already exists!"
    echo "Removing all files except .git..."
    
    # Remove all files and folders except .git
    find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
    
    # Pull latest changes
    echo "Pulling latest changes..."
    git pull origin main
else
    echo "First time setup - cloning repository..."
    
    # Remove everything
    rm -rf * 
    rm -rf .*  2>/dev/null
    
    # Clone repository
    git clone https://github.com/hijack-00/portfolio-live.git .
fi

echo ""
echo "Verifying files..."
ls -la

echo ""
echo "========================================="
echo "  Setup Complete!"
echo "========================================="
echo ""
echo "Your site should now be live at:"
echo "https://aadil.chillingon.com"
echo ""
EOF

chmod +x setup-server.sh
./setup-server.sh
```

**That's it!** Just SSH in and paste the entire block above!

---

## What Happens

### **First Time (No .git folder):**
```
1. Removes everything in Aadil folder
2. Clones portfolio-live repository
3. Sets up your site
```

### **Subsequent Runs (Has .git folder):**
```
1. Keeps .git folder intact
2. Removes all other files
3. Pulls latest changes from repository
4. Updates your site
```

---

## After Running

1. **Verify site is live:**
   ```
   https://aadil.chillingon.com
   ```

2. **Test automated deployment:**
   ```powershell
   .\deploy-live.bat
   ```

3. **Make a small change and deploy:**
   - Edit a file
   - Run `.\deploy-live.bat`
   - Enter message: `Testing deployment`
   - Wait 30 seconds
   - Check your live site!

---

## Troubleshooting

### **Permission denied when running script**
```bash
chmod +x setup-server.sh
./setup-server.sh
```

### **Repository not found**
Make sure `portfolio-live` repo exists:
https://github.com/hijack-00/portfolio-live

### **Changes not showing**
- Clear browser cache (Ctrl+Shift+Delete)
- Force refresh (Ctrl+Shift+R)

---

## You Only Need to Run This Once!

After this setup:
- ✅ Automated deployment works: `.\deploy-live.bat`
- ✅ Just push and live in 30 seconds
- ✅ Never touch the server again!

---

**Ready? SSH in and run the script!** 🚀
