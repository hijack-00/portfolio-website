# 📝 How to Update Your Portfolio - Easy Guide

## 🎯 Quick Answer

**To change something:**
1. Edit the file
2. Test it: `npm run dev`
3. Deploy it: `.\deploy.bat`
4. Done! ✨

---

## 📂 What File to Edit for What Change?

### Change Your Name, Title, or Main Info
**File**: `app/page.tsx`
**Lines**: 14-18, 108-110, 141-154

```typescript
// Change the animated texts
const texts = [
  'Booting system...',
  'Access granted...',
  'Welcome to the digital profile of YOUR NAME.'  // ← Change this
];

// Change your title/name in header
<div className="text-xl font-bold text-green-400 animate-pulse">
  <span className="text-green-300">&gt;</span> YOUR.NAME  // ← Change this
</div>

// Change your role/description
<div className="mb-8 text-lg text-green-300 animate-pulse">
  Ethical Hacker • Your Role • Your Specialty  // ← Change this
</div>
```

---

### Change About Me Section
**File**: `app/page.tsx`
**Lines**: 173-208

```typescript
<p className="text-green-200">
  Your about me text here...  // ← Change this
</p>
```

---

### Update Skills
**File**: `app/page.tsx`
**Lines**: 217-226

```typescript
{ name: 'Your Skill', level: 'Advanced', progress: 90 },  // ← Add/Edit skills
```

---

### Add/Remove Tools
**File**: `app/page.tsx`
**Lines**: 255-263

```typescript
{ name: 'Tool Name', icon: 'ri-icon-name', status: 'Active' },  // ← Add/Edit tools
```

---

### Update Projects
**File**: `app/page.tsx`
**Lines**: 289-331

```typescript
{
  title: 'Your Project Name',
  description: 'Project description',
  tech: ['Tech1', 'Tech2'],
  github: 'https://github.com/you/project',
  status: 'Completed'
},  // ← Add/Edit projects
```

---

### Update Certifications
**File**: `app/page.tsx`
**Lines**: 380-422

```typescript
{
  title: 'Certification Name',
  description: 'Description',
  progress: 75,
  status: 'In Progress',
  topics: ['Topic1', 'Topic2']
},  // ← Add/Edit certifications
```

---

### Update Blog Posts
**File**: `app/page.tsx`
**Lines**: 470-512

```typescript
{
  title: 'Blog Post Title',
  date: '2024-01-15',
  category: 'Tutorial',
  preview: 'Post preview text',
  readTime: '8 min read'
},  // ← Add/Edit blog posts
```

---

### Change Contact Info
**File**: `app/page.tsx`
**Lines**: 550-666

```typescript
<p className="text-green-400">your.email@example.com</p>  // ← Change email
<a href="https://github.com/youruser">github.com/youruser</a>  // ← Change links
```

---

### Change Page Title & Description (SEO)
**File**: `app/layout.tsx`
**Lines**: 22-25

```typescript
export const metadata: Metadata = {
  title: "Your Name | Your Title",  // ← Change browser tab title
  description: "Your description for SEO",  // ← Change description
};
```

---

### Change Theme Colors
**File**: `app/globals.css` or inline in `app/page.tsx`

```css
/* Change from green to another color */
text-green-400  →  text-blue-400   /* Text */
bg-green-400    →  bg-blue-400     /* Background */
border-green-400 → border-blue-400 /* Borders */
```

---

### Add Your Resume PDF
1. Create `public` folder if it doesn't exist
2. Put your resume: `public/Your_Resume.pdf`
3. Update link in `app/page.tsx` line 157:

```typescript
<a href="/Your_Resume.pdf" download>
```

---

## 🔄 Complete Workflow

### Making ANY Change:

```powershell
# 1️⃣ EDIT - Open the file and make your changes
# Use VS Code, Notepad++, or any editor

# 2️⃣ TEST - See your changes locally
npm run dev
# Opens at http://localhost:3000
# Check if everything looks good
# Press Ctrl+C to stop when done

# 3️⃣ DEPLOY - Push to GitHub
.\deploy.bat
# This will:
#   - Build your site
#   - Ask for a commit message (example: "Updated about me section")
#   - Push to GitHub
#   - Auto-deploy if you set up GitHub Actions!

# 4️⃣ VERIFY - Check your live site (after 2-3 minutes)
# Visit your subdomain to see changes
```

---

## ✏️ Example: Changing Your Name

**Step-by-step example:**

### 1. Open the file
Open `app/page.tsx` in your code editor

### 2. Find and change (Line 17)
```typescript
// Before:
'Welcome to the digital profile of Aadil Khan.'

// After:
'Welcome to the digital profile of YOUR NAME.'
```

### 3. Also change header (Line 109)
```typescript
// Before:
<span className="text-green-300">&gt;</span> AADIL.KHAN

// After:
<span className="text-green-300">&gt;</span> YOUR.NAME
```

### 4. Test it
```powershell
npm run dev
```
Visit http://localhost:3000 and check

### 5. Deploy it
```powershell
.\deploy.bat
```
Enter commit message: "Updated name to MY NAME"

### 6. Done! ✅
Your live site updates in 2-3 minutes!

---

## 🎨 Common Customizations

### Add a New Skill
**File**: `app/page.tsx` around line 217

```typescript
// Find the skills array and add:
{ name: 'New Skill Name', level: 'Intermediate', progress: 65 },
```

### Add a New Project
**File**: `app/page.tsx` around line 289

```typescript
// Find the projects array and add:
{
  title: 'My New Project',
  description: 'What this project does',
  tech: ['Python', 'React', 'MongoDB'],
  github: 'https://github.com/you/project',
  status: 'Active'
},
```

### Change Social Links
**File**: `app/page.tsx` around line 620-650

```typescript
// Email
<p className="text-green-400">your.email@example.com</p>

// GitHub
<a href="https://github.com/youruser">github.com/youruser</a>

// LinkedIn
<a href="https://linkedin.com/in/youruser">linkedin.com/in/youruser</a>
```

---

## 🚀 Pro Tips

### Tip 1: Test Before Deploying
**Always run `npm run dev` first!**
- Catches errors before deploying
- See changes instantly
- No waiting for build

### Tip 2: Small Commits
Instead of changing everything at once:
```powershell
# Change name
.\deploy.bat  # "Updated name"

# Add new skill
.\deploy.bat  # "Added Python skill"

# Update project
.\deploy.bat  # "Updated portfolio project"
```

### Tip 3: Good Commit Messages
```powershell
# ❌ Bad
"changes"
"update"
"fix"

# ✅ Good
"Updated about me section"
"Added 3 new projects"
"Changed contact email"
"Fixed typo in skills section"
```

### Tip 4: Use VS Code
**Search feature makes finding text easy:**
- Press `Ctrl+F` to search
- Search for the text you want to change
- Edit it
- Save with `Ctrl+S`

---

## 🆘 Troubleshooting

### "npm run dev" shows errors
**Fix:**
- Check the error message
- Usually a syntax error (missing bracket, quote, etc.)
- VS Code shows red squiggly lines where errors are

### deploy.bat fails
**Fix:**
```powershell
# Check git status
git status

# If files aren't staged:
git add .
git commit -m "Your message"
git push origin main
```

### Changes not showing on live site
**Wait 2-3 minutes** if using GitHub Actions

**Or check:**
1. Did `deploy.bat` succeed?
2. Check GitHub → Actions tab for status
3. Check GitHub → Your repo → Latest commit

### Can't find what to edit
**Search in VS Code:**
1. Press `Ctrl+Shift+F` (search all files)
2. Type the text you see on the website
3. It will show you the file and line

---

## 📋 Quick Reference

| Want to Change | Edit This File | Around Line |
|----------------|----------------|-------------|
| Name / Title | `app/page.tsx` | 17, 109 |
| About Me | `app/page.tsx` | 180-204 |
| Skills | `app/page.tsx` | 217-243 |
| Tools | `app/page.tsx` | 255-277 |
| Projects | `app/page.tsx` | 289-369 |
| Certifications | `app/page.tsx` | 380-459 |
| Blog Posts | `app/page.tsx` | 470-546 |
| Contact Info | `app/page.tsx` | 615-650 |
| Page Title (SEO) | `app/layout.tsx` | 22-25 |
| Colors/Theme | `app/page.tsx` | Search for colors |

---

## ✅ Checklist for Every Change

- [ ] Edit the file(s)
- [ ] Save changes (`Ctrl+S`)
- [ ] Test locally (`npm run dev`)
- [ ] Check it looks good in browser
- [ ] Stop dev server (`Ctrl+C`)
- [ ] Deploy (`.\deploy.bat`)
- [ ] Enter descriptive commit message
- [ ] Wait 2-3 minutes (if using GitHub Actions)
- [ ] Check live site

---

## 🎉 You're Ready!

**Remember this simple flow:**
1. **Edit** → Make your changes
2. **Test** → `npm run dev`
3. **Deploy** → `.\deploy.bat`
4. **Done!** → Changes live in minutes

---

**Need help finding something?**
- Use `Ctrl+F` in your editor to search
- Check this guide for common changes
- Look at `app/page.tsx` - that's where 90% of content is!

**Happy customizing! 🚀**
