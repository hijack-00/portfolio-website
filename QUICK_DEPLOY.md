# 🚀 Quick Deployment Steps for Hostinger

## What's Ready:
✅ Static site built in the `out` folder
✅ .htaccess file configured for optimal performance
✅ All files optimized and ready to upload

---

## 📤 Upload to Hostinger - Step by Step

### Method 1: File Manager (Easiest)

1. **Login to Hostinger**
   - Go to https://hpanel.hostinger.com
   - Enter your credentials

2. **Access File Manager**
   - Click on "File Manager" in hPanel
   - Navigate to your subdomain folder
   - Usually: `public_html/subdomain_name/` or `domains/subdomain.domain.com/public_html/`

3. **Clear Existing Files** (if any)
   - Select all files in the subdomain folder
   - Delete them

4. **Upload Files**
   - Click "Upload Files" button
   - Select ALL files from the `out` folder:
     ```
     d:\Development\generated\hacker_theme\out\
     ```
   - Upload:
     - index.html
     - 404.html
     - .htaccess
     - _next (entire folder)
     - index.txt
     - Any other files/folders

5. **Set Permissions** (if needed)
   - Right-click files → Permissions
   - Files: 644
   - Folders: 755

6. **Test Your Site**
   - Visit: https://yoursubdomain.yourdomain.com
   - Should see your portfolio!

---

### Method 2: FTP (Recommended for Large Files)

1. **Get FTP Credentials**
   - In hPanel, go to "Files → FTP Accounts"
   - Note down:
     - Hostname: `ftp.yourdomain.com`
     - Username: (your FTP username)
     - Password: (your FTP password)
     - Port: 21

2. **Download FileZilla**
   - Download from: https://filezilla-project.org
   - Install and open

3. **Connect to Hostinger**
   - Host: `ftp.yourdomain.com`
   - Username: `your_ftp_username`
   - Password: `your_ftp_password`
   - Port: 21
   - Click "Quickconnect"

4. **Navigate to Subdomain Folder**
   - In remote site (right panel)
   - Go to subdomain directory

5. **Upload Files**
   - In local site (left panel), navigate to:
     ```
     d:\Development\generated\hacker_theme\out\
     ```
   - Select all files and folders
   - Drag to remote site (right panel)
   - Wait for upload to complete

6. **Verify Upload**
   - Check all files transferred successfully
   - Visit your subdomain URL

---

## 🌐 Setup Subdomain (if not already done)

1. **Create Subdomain in Hostinger**
   - Go to hPanel → Domains → Subdomains
   - Click "Create Subdomain"
   - Enter subdomain name (e.g., `portfolio`)
   - For domain: select your main domain
   - Document root: leave default or specify folder
   - Click "Create"

2. **Wait for DNS Propagation**
   - Usually takes 5-15 minutes
   - Sometimes up to 24 hours

---

## 🔒 Enable SSL (HTTPS)

1. **Activate SSL in hPanel**
   - Go to Security → SSL
   - Select your subdomain
   - Click "Install SSL"
   - Choose "Free SSL" (Let's Encrypt)
   - Wait for activation (5-15 minutes)

2. **Verify HTTPS**
   - Visit: https://yoursubdomain.yourdomain.com
   - Should show padlock in browser

3. **.htaccess Already Configured**
   - The .htaccess file already forces HTTPS redirect
   - HTTP requests auto-redirect to HTTPS

---

## ✅ Post-Deployment Checklist

- [ ] All files uploaded to subdomain folder
- [ ] index.html is in root of subdomain
- [ ] .htaccess file is present
- [ ] Site loads at subdomain URL
- [ ] HTTPS/SSL is active
- [ ] All animations work (typing effect, matrix rain)
- [ ] Navigation scrolls properly
- [ ] Mobile responsive
- [ ] All sections visible
- [ ] Contact form styled correctly
- [ ] 404 page works (try invalid URL)

---

## 🔄 Future Updates

When you make changes to your portfolio:

1. **Edit Files Locally**
   - Make changes in your code

2. **Test Changes**
   ```powershell
   npm run dev
   ```

3. **Build New Version**
   ```powershell
   powershell -ExecutionPolicy Bypass -Command "npm run build"
   ```

4. **Upload New Files**
   - Upload contents of `out` folder to Hostinger
   - Overwrite existing files

5. **Clear Cache**
   - Clear browser cache
   - Test the site

---

## 🆘 Troubleshooting

### Site Shows "Index of /" or Directory Listing
**Fix**: Ensure `index.html` is in the correct folder and `.htaccess` Options -Indexes is present

### 404 on Refresh or Direct Links
**Fix**: Check that `.htaccess` file is uploaded and rewrite rules are active

### Assets Not Loading (Broken CSS/Images)
**Fix**: 
- Check file permissions (644 for files, 755 for folders)
- Verify `_next` folder uploaded completely
- Check browser console for errors

### HTTPS Not Working
**Fix**:
- Wait longer (SSL activation can take time)
- Check SSL is installed in hPanel
- Force HTTPS in .htaccess (already included)

### Slow Loading
**Fix**: Already optimized with:
- GZIP compression in .htaccess
- Browser caching enabled
- Static export (no server processing)

---

## 📞 Support

**Hostinger Support**: Available 24/7
- Live Chat: In hPanel bottom-right
- Email: support@hostinger.com
- Knowledge Base: help.hostinger.com

---

## 🎉 Your Site Structure After Upload

```
subdomain.yourdomain.com/
├── .htaccess              (Apache config)
├── index.html             (Main page)
├── 404.html               (Error page)
├── index.txt              (Build info)
└── _next/                 (Next.js assets)
    ├── static/
    │   ├── css/
    │   ├── chunks/
    │   └── media/
    └── ...
```

---

**Ready to deploy! 🚀 Just follow the steps above!**

All files in the `out` folder are production-ready and optimized.
