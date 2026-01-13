# 📄 Resume Setup Guide

## ✅ What's Already Done

Your portfolio's "Download Resume" button is **already configured** and ready to work!

**Button location**: Homepage hero section  
**Download link**: `/Aadil_Khan_Resume.pdf`  
**File location**: `public/Aadil_Khan_Resume.pdf`

---

## 🎯 How to Add Your Resume (3 Options)

### **Option 1: Convert HTML Template to PDF (Easiest)**

I've created a professional resume template for you!

1. **Open the template**:
   ```
   d:\Development\generated\hacker_theme\public\resume_template.html
   ```

2. **Edit the content**:
   - Update your personal information
   - Modify experience, projects, skills
   - Add your real contact details
   - Customize as needed

3. **Convert to PDF** (Choose one method):

   **Method A: Using Browser (Recommended)**
   - Open `resume_template.html` in Chrome/Edge
   - Press `Ctrl + P` (Print)
   - Destination: "Save as PDF"
   - Layout: Portrait
   - Margins: None or Minimal
   - Save as: `Aadil_Khan_Resume.pdf`
   - Place in: `public` folder

   **Method B: Using Online Tool**
   - Go to: https://www.ilovepdf.com/html-to-pdf
   - Upload `resume_template.html`
   - Download PDF
   - Rename to: `Aadil_Khan_Resume.pdf`
   - Place in: `public` folder

   **Method C: Using Word/Google Docs**
   - Open `resume_template.html` in browser
   - Select all (Ctrl+A) and copy
   - Paste into Word/Google Docs
   - Format as needed
   - Export as PDF
   - Save as: `Aadil_Khan_Resume.pdf`

---

### **Option 2: Use Your Existing Resume**

If you already have a resume PDF:

1. **Rename it** to: `Aadil_Khan_Resume.pdf`
2. **Place it** in: `d:\Development\generated\hacker_theme\public\`
3. **Done!**

---

### **Option 3: Create from Scratch**

Use any of these tools to create your resume:

**Free Online Tools:**
- **Canva**: https://www.canva.com/resumes/
- **Resume.io**: https://resume.io/
- **Novoresume**: https://novoresume.com/
- **Google Docs Templates**: File → New → Resume

**After creating:**
1. Export as PDF
2. Name it: `Aadil_Khan_Resume.pdf`
3. Place in: `public` folder

---

## 📁 File Structure

```
hacker_theme/
├── public/                           ← Resume goes here!
│   ├── Aadil_Khan_Resume.pdf        ← YOUR RESUME (place here)
│   ├── resume_template.html         ← Template to customize
│   ├── README.md                    ← Public folder info
│   └── PLACE_YOUR_RESUME_HERE.txt   ← Instructions
│
└── app/
    └── page.tsx                      ← Download button (already configured!)
```

---

## ✅ Verification Checklist

After placing your resume:

- [ ] File is named exactly: `Aadil_Khan_Resume.pdf`
- [ ] File is in: `public` folder
- [ ] File size is reasonable (under 5MB)
- [ ] PDF opens correctly when double-clicked

---

## 🧪 Testing

### **Local Testing**

1. **Build your site**:
   ```powershell
   npm run build
   ```

2. **Check the output folder**:
   The resume should be copied to: `out/Aadil_Khan_Resume.pdf`

3. **Test the download**:
   - Run dev server: `npm run dev`
   - Visit: http://localhost:3000
   - Click: "[DOWNLOAD_RESUME.PDF]" button
   - Verify PDF downloads correctly

---

### **After Deployment**

Visit your live site and test:
```
https://yoursubdomain.yourdomain.com
```

Click the download button and verify it works!

---

## 🚀 Deployment

Once you've added your resume:

```powershell
# Build (this copies resume to 'out' folder)
npm run build

# Deploy
.\deploy.bat
# Message: "Added resume PDF"
```

**For Hostinger:**
- If using GitHub Actions: Resume auto-deploys!
- If manual FTP: Upload the entire `out` folder (includes resume)

---

## 🎨 Customizing the Template

The `resume_template.html` uses:
- **Green accent color** (#00ff00) - matches your portfolio theme
- **Clean, professional layout**
- **Print-optimized** styling
- **ATS-friendly** format

**To customize:**
1. Open in text editor (VS Code, Notepad++)
2. Edit the HTML content
3. Save and preview in browser
4. Convert to PDF when satisfied

**Key sections in template:**
- Lines 118-128: Header (name, title, contact)
- Lines 130-139: Professional summary
- Lines 141-154: Skills grid
- Lines 156-166: Technical skills
- Lines 168-199: Professional experience
- Lines 201-271: Projects
- Lines 273-285: Certifications
- Lines 287-302: Services offered
- Lines 304-312: Education

---

## 💡 Pro Tips

### Make Your Resume Stand Out:
1. **Quantify achievements** (e.g., "Increased performance by 40%")
2. **Use action verbs** (Developed, Built, Designed, Implemented)
3. **Tailor to job** (Highlight relevant skills for each opportunity)
4. **Keep it concise** (1-2 pages maximum)
5. **Use consistent formatting**
6. **Proofread** carefully (no typos!)

### SEO & Keywords:
Include keywords from your expertise:
- Web Development, React, Next.js
- Mobile Development, Flutter, React Native
- WordPress, Shopify, E-commerce
- API Development, Node.js, Express
- Cybersecurity, Ethical Hacking
- Cloud, AWS, DevOps
- Database, MongoDB, MySQL

### Design Tips:
- **Use white space** - Don't overcrowd
- **Consistent fonts** - Max 2 font families
- **Clear hierarchy** - Headings, subheadings, body
- **Professional colors** - Green accents match your brand!
- **Easy to scan** - Recruiters spend 6 seconds on average

---

## 🔄 Updating Your Resume

When you want to update your resume:

1. **Edit** the template or create new PDF
2. **Replace** `Aadil_Khan_Resume.pdf` in `public` folder
3. **Build**: `npm run build`
4. **Deploy**: `.\deploy.bat`
5. **Done!**

---

## ❓ Troubleshooting

### Resume not downloading
**Fix:**
- Check file name is exact: `Aadil_Khan_Resume.pdf`
- Ensure file is in `public` folder
- Rebuild: `npm run build`
- Check `out` folder for the PDF

### 404 Error when clicking download
**Fix:**
- File must be in `public` folder before building
- Run `npm run build` again
- Check that PDF copied to `out` folder

### PDF doesn't look good
**Fix:**
- Use "Print to PDF" in Chrome for best results
- Set margins to "None" or "Minimal"
- Ensure layout is Portrait mode
- Check "Background graphics" is enabled

---

## 📋 Resume Template Included

I've created a **professional resume template** with:
- ✅ Your IT Consultant/Developer/Ethical Hacker title
- ✅ All your skills and expertise
- ✅ Project portfolio
- ✅ Certifications and courses
- ✅ Services offered
- ✅ Green accent theme matching your portfolio
- ✅ Print-optimized styling
- ✅ Professional layout

**File**: `public/resume_template.html`

Just customize the content and convert to PDF!

---

## 🎯 Quick Start

**Fastest way to get resume working:**

```powershell
# 1. Open template
start public/resume_template.html

# 2. Edit in browser → Print → Save as PDF
# Save as: Aadil_Khan_Resume.pdf
# Location: public folder

# 3. Build
npm run build

# 4. Test locally
npm run dev
# Click download button at localhost:3000

# 5. Deploy
.\deploy.bat
```

**Done! Resume is live!** 🎉

---

## 📧 Need Help?

- **Template location**: `public/resume_template.html`
- **Final PDF location**: `public/Aadil_Khan_Resume.pdf`
- **Download button**: Already configured in `app/page.tsx` line 157-163

---

**Your resume download functionality is ready to go!** 🚀

Just add your PDF to the `public` folder and deploy!
