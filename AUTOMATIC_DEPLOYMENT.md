# 🚀 Automatic Deployment Setup - Complete Guide

## Overview

This guide sets up **automatic deployment** where:
1. You run `.\deploy.bat` on your computer
2. GitHub automatically builds your site
3. GitHub automatically uploads to Hostinger
4. Your live site updates in 2-3 minutes!

**No manual uploads! No SSH needed! No server-side Node.js required!**

---

## ✅ What's Already Done

Your project **already has** everything configured:
- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Build script (`npm run build`)
- ✅ Deploy script (`deploy.bat`)
- ✅ Static export configuration

**You're 90% there! Just need to add GitHub secrets!**

---

## 🎯 Complete Setup (5 Minutes)

### **Step 1: Get Your FTP Credentials from Hostinger**

1. **Login to Hostinger hPanel**: https://hpanel.hostinger.com
2. **Go to**: Files → FTP Accounts
3. **Note/Copy these details**:
   ```
   FTP Server: ftp.yourdomain.com (or IP like 123.45.67.89)
   Username: u123456789 (your FTP username)
   Password: your_ftp_password
   Port: 21 (default)
   ```

4. **Find your subdomain path**:
   - Go to: File Manager
   - Navigate to find your subdomain folder
   - Common paths:
     - `/domains/portfolio.yourdomain.com/public_html/`
     - `/public_html/portfolio/`
     - `/domains/yourdomain.com/public_html/subdomain/`
   - **Copy the exact path!**

---

### **Step 2: Add Secrets to GitHub**

1. **Go to your GitHub repository**:
   ```
   https://github.com/hijack-00/portfolio-website
   ```

2. **Click**: Settings (top menu bar)

3. **Click**: Secrets and variables → Actions (left sidebar)

4. **Click**: "New repository secret" (green button)

5. **Add these 4 secrets** one by one:

---

**Secret #1: FTP_SERVER**
- Name: `FTP_SERVER`
- Value: `ftp.yourdomain.com` (or your IP)
- Click: "Add secret"

---

**Secret #2: FTP_USERNAME**
- Click: "New repository secret" again
- Name: `FTP_USERNAME`
- Value: `u123456789` (your actual FTP username)
- Click: "Add secret"

---

**Secret #3: FTP_PASSWORD**
- Click: "New repository secret" again
- Name: `FTP_PASSWORD`
- Value: Your FTP password
- Click: "Add secret"

---

**Secret #4: FTP_SERVER_DIR**
- Click: "New repository secret" again
- Name: `FTP_SERVER_DIR`
- Value: `/domains/portfolio.yourdomain.com/public_html/`
  - **IMPORTANT**: Must end with `/`
  - Use your actual subdomain path!
- Click: "Add secret"

---

### **Step 3: Verify Secrets**

After adding all 4 secrets, you should see:
- ✅ FTP_SERVER
- ✅ FTP_USERNAME
- ✅ FTP_PASSWORD
- ✅ FTP_SERVER_DIR

**Note**: You can't view secret values after saving (for security), only edit/delete them.

---

### **Step 4: Test the Deployment!**

```powershell
# Make a small change (optional)
# For example, edit README.md or add a comment

# Run deploy script
.\deploy.bat

# When prompted for commit message, type:
Testing automatic deployment

# Press Enter
```

**What happens now:**
1. ✅ Code commits to Git
2. ✅ Pushes to GitHub
3. ✅ GitHub Actions starts automatically
4. ✅ Builds your site (creates `out` folder)
5. ✅ Uploads to Hostinger via FTP
6. ✅ Your site updates! 🎉

---

### **Step 5: Monitor the Deployment**

1. **Go to GitHub**: https://github.com/hijack-00/portfolio-website
2. **Click**: Actions tab (top menu)
3. **See**: "Deploy to Hostinger" workflow running
4. **Click** on it to see progress
5. **Wait** for green checkmark ✅ (takes 2-3 minutes)

**Workflow steps you'll see:**
- 📥 Checkout code
- 🟢 Setup Node.js
- 📦 Install dependencies
- 🔨 Build project
- 🚀 Deploy to Hostinger via FTP
- ✅ Deployment complete!

---

## 🎯 Daily Workflow (After Setup)

From now on, whenever you want to update your site:

```powershell
# 1. Make your changes (edit files)

# 2. Test locally (optional but recommended)
npm run dev
# Check localhost:3000

# 3. Deploy!
.\deploy.bat

# Enter commit message, like:
# "Updated about section"
# "Added new project"
# "Fixed contact form"

# 4. Wait 2-3 minutes
# Check GitHub Actions for green checkmark

# 5. Visit your live site!
# https://portfolio.yourdomain.com
```

**That's it!** 🎉

---

## 📊 What Happens Automatically

```
LOCAL MACHINE:
├─ Edit files (app/page.tsx, etc.)
├─ Run: .\deploy.bat
├─ Git commit + push → GitHub
│
GITHUB (Automatic):
├─ Detects push to 'main' branch
├─ Starts GitHub Actions workflow
├─ npm install (installs dependencies)
├─ npm run build (creates 'out' folder)
├─ FTP Deploy (uploads out/* to Hostinger)
│
HOSTINGER:
├─ Receives files via FTP
├─ Files placed in subdomain folder
├─ Site automatically updated
└─ LIVE! ✅
```

---

## 🔍 Troubleshooting

### ❌ GitHub Actions Fails

**Check these:**

1. **FTP Credentials Wrong**
   - Fix: Update secrets in GitHub
   - Settings → Secrets → Edit each secret

2. **FTP_SERVER_DIR Path Wrong**
   - Fix: Verify exact path in Hostinger File Manager
   - Must end with `/`
   - Example: `/domains/portfolio.domain.com/public_html/`

3. **FTP Port Blocked**
   - Fix: Some networks block port 21
   - Try from different network/wifi

4. **View Error Logs**:
   - GitHub → Actions → Click failed workflow
   - Click on "Deploy to Hostinger via FTP" step
   - Read error message

---

### ✅ How to Verify It's Working

1. **Check GitHub Actions**:
   - Go to repo → Actions tab
   - Should see green checkmarks ✅
   - If red ❌, click to see error

2. **Check Hostinger Files**:
   - Login to hPanel → File Manager
   - Navigate to your subdomain folder
   - Should see: `index.html`, `404.html`, `.htaccess`, `_next/` folder
   - Check file timestamps (should be recent)

3. **Check Live Site**:
   - Visit your subdomain
   - Force refresh: `Ctrl + Shift + R`
   - Should see your latest changes

---

## 🎨 Workflow Customization

### Change Build Trigger

Edit `.github/workflows/deploy.yml` if you want to:

**Deploy on different branch:**
```yaml
on:
  push:
    branches: [ production ]  # Instead of main
```

**Manual deployment only:**
```yaml
on:
  workflow_dispatch:  # Removes automatic, adds manual button
```

**Deploy on pull requests too:**
```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

---

## ⚡ Speed & Performance

**Typical deployment times:**
- Build: ~30 seconds
- FTP Upload: ~30-60 seconds
- Total: **~2-3 minutes**

**What if it's slow?**
- Large files slow down FTP upload
- Optimize images before committing
- Remove unnecessary files from `out` folder

---

## 🔐 Security Notes

**GitHub Secrets are encrypted:**
- ✅ Not visible to anyone (including you)
- ✅ Only accessible by GitHub Actions
- ✅ Encrypted at rest
- ✅ Safe to use FTP password

**Best practices:**
- Don't commit `.env` files
- Don't hardcode passwords
- Use secrets for all sensitive data
- Regularly update FTP password

---

## 📋 Complete Checklist

**One-Time Setup:**
- [ ] GitHub repository created
- [ ] FTP credentials obtained from Hostinger
- [ ] Subdomain path identified
- [ ] 4 secrets added to GitHub:
  - [ ] FTP_SERVER
  - [ ] FTP_USERNAME
  - [ ] FTP_PASSWORD
  - [ ] FTP_SERVER_DIR
- [ ] Test deployment successful
- [ ] Live site updated

**Every Deployment:**
- [ ] Make changes locally
- [ ] Test with `npm run dev` (optional)
- [ ] Run `.\deploy.bat`
- [ ] Enter commit message
- [ ] Check GitHub Actions (green ✅)
- [ ] Verify live site updated

---

## 🎯 Advanced: Alternative Approaches

### Option A: Current Setup (Recommended)
**GitHub Actions builds, FTP uploads**
- ✅ Works on all Hostinger plans
- ✅ No SSH needed
- ✅ No server-side Node.js needed
- ✅ Already configured!

### Option B: SSH + Git Pull + Build on Server
**Server pulls code and rebuilds**
- ❌ Requires SSH access
- ❌ Requires Node.js on Hostinger
- ❌ More complex setup
- ❌ May not work on shared hosting
- Only for VPS/dedicated servers

### Option C: Manual FTP Upload
**Build locally, upload manually**
- ❌ Manual process every time
- ❌ Slow and error-prone
- ❌ Not recommended

**We're using Option A - Best for you!** 🎉

---

## 📞 Need Help?

**GitHub Actions failing?**
1. Check Actions tab for error message
2. Verify all 4 secrets are correct
3. Test FTP connection with FileZilla first
4. Check Hostinger server status

**Site not updating?**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Force refresh (Ctrl+Shift+R)
3. Check file timestamps in Hostinger
4. Verify correct subdomain path

**Still stuck?**
- Check GitHub Actions logs (detailed errors)
- Verify FTP credentials in Hostinger
- Test FTP connection manually
- Contact Hostinger support for FTP issues

---

## 🎉 Success!

Once set up, your workflow is:

```
Edit → .\deploy.bat → Wait 3 min → Live! ✅
```

**No manual uploads! No FTP clients! Just code and deploy!** 🚀

---

## 📝 Example Deployment

```powershell
PS D:\Development\generated\hacker_theme> .\deploy.bat

========================================
  Portfolio Deployment Script
========================================

[1/4] Building project...
✓ Build successful!

[2/4] Staging changes...
✓ Changes staged!

[3/4] Committing changes...
Enter commit message: Updated resume and projects
✓ Changes committed!

[4/4] Pushing to GitHub...
✓ Pushed to GitHub!

========================================
  ✅ Local deployment complete!
========================================

Next: Check GitHub Actions for automatic deployment!
Visit: https://github.com/hijack-00/portfolio-website/actions
```

Then in GitHub:
- ✅ Workflow runs automatically
- ✅ Builds in ~2 minutes
- ✅ Uploads to Hostinger
- ✅ Your site is updated!

---

**Your automatic deployment is ready!** 🚀

Just add the 4 GitHub secrets and you're good to go!
