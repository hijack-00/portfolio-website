# ⚡ CHEAT SHEET - Making Changes

## 🎯 The 3 Commands You Need

```powershell
# 1️⃣ TEST your changes
npm run dev

# 2️⃣ DEPLOY your changes  
.\deploy.bat

# 3️⃣ (That's it!)
```

---

## 📝 What File to Edit?

| I Want to Change... | Open This File... | Line # |
|-------------------|------------------|---------|
| 🙋 **My name** | `app/page.tsx` | 17, 109 |
| 📖 **About me** | `app/page.tsx` | 180-204 |
| 💪 **Skills** | `app/page.tsx` | 217-243 |
| 🛠️ **Tools** | `app/page.tsx` | 255-277 |
| 🚀 **Projects** | `app/page.tsx` | 289-369 |
| 📜 **Certifications** | `app/page.tsx` | 380-459 |
| ✍️ **Blog posts** | `app/page.tsx` | 470-546 |
| 📧 **Contact info** | `app/page.tsx` | 615-650 |
| 🏷️ **Page title** | `app/layout.tsx` | 22-25 |
| 🎨 **Colors** | `app/page.tsx` | (search) |

**90% of changes = `app/page.tsx`**

---

## 🔄 Every Single Time Workflow

```
1. EDIT file → Save (Ctrl+S)
   ↓
2. TEST → npm run dev → Check localhost:3000
   ↓
3. DEPLOY → .\deploy.bat → Enter message
   ↓
4. WAIT 2-3 minutes
   ↓
5. ✅ LIVE!
```

---

## 💡 Quick Examples

### Change Your Name
```typescript
// app/page.tsx - Line 17
'Welcome to the digital profile of YOUR NAME HERE.'

// app/page.tsx - Line 109
AADIL.KHAN  →  YOUR.NAME
```

### Add a Skill
```typescript
// app/page.tsx - Line 217 (add to array)
{ name: 'My New Skill', level: 'Advanced', progress: 85 },
```

### Add a Project
```typescript
// app/page.tsx - Line 289 (add to array)
{
  title: 'My Cool Project',
  description: 'What it does',
  tech: ['Python', 'React'],
  github: 'https://github.com/you/project',
  status: 'Active'
},
```

### Change Email
```typescript
// app/page.tsx - Line 620
<p className="text-green-400">your.new.email@example.com</p>
```

---

## 🆘 Help! Something Broke!

### Error when running npm run dev?
- **Check syntax** (missing comma, bracket, quote)
- **Look for red squiggles** in VS Code
- **Read error message** - it tells you the line number!

### deploy.bat not working?
```powershell
# Manual deploy:
git add .
git commit -m "your message"
git push origin main
```

### Changes not live?
- **Wait 2-3 minutes** (GitHub Actions takes time)
- **Check** GitHub → Actions tab → See if green checkmark

---

## 📍 Where is Everything?

```
app/
├── page.tsx       ← 👈 EDIT THIS for most changes!
├── layout.tsx     ← Page title & SEO
├── globals.css    ← Global styles
└── not-found.tsx  ← 404 page
```

---

## ✅ Quick Checklist

Every time you make a change:
- [ ] Edit file
- [ ] Save (Ctrl+S)
- [ ] Test (`npm run dev`)
- [ ] Looks good? Stop server (Ctrl+C)
- [ ] Deploy (`.\deploy.bat`)
- [ ] Enter message
- [ ] Wait 2-3 min
- [ ] Check live site

---

## 🎯 Remember!

**Edit → Test → Deploy**

That's it! 🚀

---

**For detailed help, see:** `HOW_TO_UPDATE.md`
