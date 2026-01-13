# 📤 Manual Deployment to Hostinger - Step by Step Guide

This guide will walk you through deploying your Next.js portfolio to Hostinger manually without using automated scripts.

---

## 📋 Prerequisites

- ✅ Hostinger account with hosting plan
- ✅ FTP access credentials from Hostinger
- ✅ FileZilla (FTP client) installed
- ✅ Your domain/subdomain: `aadil.chillingon.com`

---

## 🎯 STEP-BY-STEP DEPLOYMENT PROCESS

### **Step 1: Build Your Website Locally**

1. **Open PowerShell/Command Prompt** in your project folder:
   ```
   d:\Development\generated\hacker_theme
   ```

2. **Run the build command:**
   ```powershell
   npm run build
   ```

3. **Wait** for the build to complete (~30 seconds)

4. **Verify** that an `out` folder was created with these files:
   - `index.html`
   - `404.html`
   - `_next/` folder (contains CSS, JS, fonts)

✅ **The `out` folder contains your entire website ready for deployment**

---

### **Step 2: Get Your FTP Credentials from Hostinger**

1. **Login** to Hostinger: https://hpanel.hostinger.com

2. **Navigate** to your hosting account

3. **Go to** Files → **FTP Accounts**

4. **Note down** these details:
   ```
   FTP Server/Host: 145.79.210.122
   FTP Username: u284898047.chillingon.com
   FTP Password: HiJack@110
   FTP Port: 65002
   ```

5. **Note your subdomain folder path:**
   ```
   /domains/chillingon.com/public_html/Aadil/
   ```

---

### **Step 3: Download and Install FileZilla**

1. **Download FileZilla Client** from:
   ```
   https://filezilla-project.org/download.php?type=client
   ```

2. **Install** FileZilla (free FTP client)

3. **Open** FileZilla

---

### **Step 4: Connect to Hostinger via FTP**

In FileZilla, enter connection details at the top:

1. **Host:** `145.79.210.122`
2. **Username:** `u284898047.chillingon.com`
3. **Password:** `HiJack@110`
4. **Port:** `65002`

5. **Click** "Quickconnect"

6. **If prompted** about unknown certificate:
   - Check "Always trust this host"
   - Click "OK"

✅ **You should now see your Hostinger files on the right side**

---

### **Step 5: Navigate to Your Subdomain Folder**

On the **RIGHT side** (Hostinger server):

1. **Navigate** to: `/domains/chillingon.com/public_html/Aadil/`

2. **Clear existing files** (if any):
   - Select all files in the folder
   - Right-click → Delete
   - Confirm deletion

⚠️ **Make sure you're in the correct folder before deleting!**

---

### **Step 6: Upload Your Website Files**

On the **LEFT side** (your computer):

1. **Navigate** to: `d:\Development\generated\hacker_theme\out\`

2. **Select ALL files and folders** inside `out`:
   - `404.html`
   - `index.html`
   - `_next/` folder
   - Any other files/folders

3. **Drag and drop** them to the RIGHT side (to `/Aadil/` folder)

   OR

   Right-click selection → **Upload**

4. **Wait** for upload to complete (~1-2 minutes)
   - You'll see upload progress at the bottom
   - Green checkmarks mean files uploaded successfully

✅ **Your website files are now on Hostinger!**

---

### **Step 7: Verify Upload**

In FileZilla (right side), you should see:

```
/domains/chillingon.com/public_html/Aadil/
├── 404.html
├── index.html
├── _next/
│   ├── static/
│   │   ├── css/
│   │   ├── chunks/
│   │   └── media/
├── PLACE_YOUR_RESUME_HERE.txt
├── README.md
└── resume_template.html
```

✅ **If you see these files, upload was successful!**

---

### **Step 8: Test Your Live Website**

1. **Open your browser**

2. **Visit:** https://aadil.chillingon.com

3. **Force refresh** to clear cache:
   - Windows: Press `Ctrl + Shift + R`
   - Mac: Press `Cmd + Shift + R`

4. **Check** that:
   - Homepage loads correctly
   - All sections visible
   - Menu navigation works
   - Mobile responsive header working

✅ **Your website is now LIVE!**

---

## 🔄 UPDATING YOUR WEBSITE (FUTURE CHANGES)

Whenever you make changes to your code:

### **Quick Update Process:**

1. **Make changes** to your code

2. **Build:**
   ```powershell
   npm run build
   ```

3. **Open FileZilla**

4. **Connect** to Hostinger (same credentials)

5. **Navigate** to `/Aadil/` folder (right side)

6. **Delete old files** from server

7. **Upload new files** from `out` folder

8. **Refresh browser** to see changes

---

## 📱 MOBILE TESTING

After deployment, test on:

- 📱 **Mobile Phone** (Chrome, Safari)
- 📱 **Tablet** (iPad, Android tablet)
- 🖥️ **Desktop** (Chrome, Firefox, Edge)

**Test these features:**
- ✅ Homepage loads
- ✅ Menu opens on mobile
- ✅ All sections scroll smoothly
- ✅ Resume download works
- ✅ Contact form/links work

---

## 🆘 TROUBLESHOOTING

### **Problem: Website not loading**

**Solutions:**
- Clear browser cache (Ctrl+Shift+Delete)
- Force refresh (Ctrl+Shift+R)
- Check files were uploaded to `/Aadil/` folder
- Verify `index.html` exists in the folder

### **Problem: 404 Error / Page Not Found**

**Solutions:**
- Make sure you uploaded to `/Aadil/` not `/public_html/`
- Check subdomain is pointing to correct folder
- Verify all files uploaded successfully

### **Problem: CSS/Styling not working**

**Solutions:**
- Make sure `_next` folder uploaded completely
- Check file permissions (should be 644 for files, 755 for folders)
- Clear browser cache and force refresh

### **Problem: Upload fails**

**Solutions:**
- Check FTP credentials are correct
- Verify port is 65002 (not 21)
- Check internet connection
- Try uploading files in smaller batches

### **Problem: Changes not showing**

**Solutions:**
- Clear browser cache completely
- Force refresh multiple times
- Wait 2-3 minutes for server cache to clear
- Check you uploaded to correct folder

---

## 📊 FILE STRUCTURE ON SERVER

After upload, your server should look like this:

```
/domains/chillingon.com/public_html/Aadil/
│
├── index.html                    (Homepage)
├── 404.html                      (Error page)
│
├── _next/
│   └── static/
│       ├── css/                  (Stylesheets)
│       │   └── 7b9feff98d9d6f01.css
│       │
│       ├── chunks/               (JavaScript)
│       │   ├── 341.df3329d...js
│       │   ├── 472.a3826d...js
│       │   └── ... (many more)
│       │
│       ├── media/                (Fonts)
│       │   ├── 424a6f0e...woff2
│       │   └── ... (font files)
│       │
│       └── [buildId]/            (Build manifests)
│           ├── _buildManifest.js
│           └── _ssgManifest.js
│
├── PLACE_YOUR_RESUME_HERE.txt   (Instructions)
├── README.md                     (Info)
└── resume_template.html          (Resume template)
```

---

## 💡 PRO TIPS

### **Faster Uploads:**
- **Keep** `_next` folder on server if not changed
- **Only replace** `index.html` and `404.html` for content updates
- **Full upload** only when design/code changes

### **Before Uploading:**
- **Test locally** with `npm run dev`
- **Check** all links work
- **Verify** mobile responsiveness
- **Test** on different browsers

### **File Permissions:**
- **Files:** 644 (read/write for owner, read for others)
- **Folders:** 755 (read/write/execute for owner, read/execute for others)
- FileZilla can set these automatically

### **Backup:**
- **Download** current website from server before uploading
- **Keep** local backups of working versions
- **Test** on subdomain before main domain

---

## 📋 QUICK REFERENCE

### **FTP Connection:**
```
Host: 145.79.210.122
User: u284898047.chillingon.com
Pass: HiJack@110
Port: 65002
Path: /domains/chillingon.com/public_html/Aadil/
```

### **Build Command:**
```powershell
npm run build
```

### **Upload Source:**
```
Local: d:\Development\generated\hacker_theme\out\
Server: /domains/chillingon.com/public_html/Aadil/
```

### **Your Live URL:**
```
https://aadil.chillingon.com
```

---

## ✅ DEPLOYMENT CHECKLIST

**Before Upload:**
- [ ] Code changes tested locally
- [ ] `npm run build` completed successfully
- [ ] `out` folder created and contains files
- [ ] FileZilla installed and ready

**During Upload:**
- [ ] Connected to FTP successfully
- [ ] Navigated to correct folder (`/Aadil/`)
- [ ] Backed up old files (optional)
- [ ] Deleted old files from server
- [ ] Uploaded all files from `out` folder
- [ ] Verified upload completed (green checkmarks)

**After Upload:**
- [ ] Visited live website URL
- [ ] Force refreshed browser
- [ ] Tested homepage loads
- [ ] Checked menu navigation
- [ ] Tested on mobile device
- [ ] Verified all sections working
- [ ] Resume download tested

---

## 🎉 SUCCESS!

Your website is now deployed and live!

**Live URL:** https://aadil.chillingon.com

**For updates:** Just repeat steps 1-7 (takes ~5 minutes)

---

## 📞 NEED HELP?

**Hostinger Support:**
- Live Chat: Available in hPanel
- Email: support@hostinger.com
- Knowledge Base: https://support.hostinger.com

**FileZilla Help:**
- Wiki: https://wiki.filezilla-project.org
- Forum: https://forum.filezilla-project.org

---

**You're all set! Your portfolio is now live without any automated scripts!** 🚀
