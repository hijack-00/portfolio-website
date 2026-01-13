# 🚀 QUICK REFERENCE CARD

## Your Portfolio Management System

```
📁 hacker_theme/
├── 📂 frontend/    → Portfolio Website (Next.js)
├── 📂 server/      → Backend API (Node.js + MongoDB)
└── 📂 admin/       → Admin Panel (React)
```

---

## 🎯 START COMMANDS (Run in Order)

### ① Database Setup (One-Time)
```powershell
cd server
npm run seed
```

### ② Start Backend
```powershell
cd server
npm run dev
```
✅ Running on http://localhost:5000

### ③ Start Admin (New Terminal)
```powershell
cd admin
npm run dev
```
✅ Running on http://localhost:3001

### ④ Start Frontend (New Terminal)
```powershell
cd frontend
npm run dev
```
✅ Running on http://localhost:3000

---

## 🔐 LOGIN CREDENTIALS

**Admin Panel:** http://localhost:3001
- **Email:** admin@portfolio.com
- **Password:** Admin@12345

⚠️ **Change after first login!**

---

## 📡 API ENDPOINTS

**Base URL:** http://localhost:5000/api

### Public (No Auth)
- GET `/profile`
- GET `/about`
- GET `/skills`
- GET `/tools`
- GET `/projects`
- GET `/certifications`
- GET `/blog`
- POST `/contact`

### Admin (Requires Token)
All endpoints support:
- GET `/[resource]/all`
- POST `/[resource]`
- PUT `/[resource]/:id`
- DELETE `/[resource]/:id`

---

## 🛠️ DEVELOPMENT WORKFLOW

1. **Update Content**
   - Login to admin panel
   - Add/edit/delete content
   - Changes auto-save to MongoDB

2. **View Changes**
   - API instantly available
   - Frontend fetches from API
   - Changes appear on website

3. **Upload Files**
   - Configure Cloudflare R2 first
   - Upload via admin panel
   - Files stored in cloud

---

## 📁 KEY FILES

### Configuration
```
server/.env               # MongoDB + Cloudflare R2
admin/.env                # API URL
frontend/.env.local       # EmailJS (optional)
```

### Entry Points
```
server/server.js          # Backend starts here
admin/src/main.jsx        # Admin starts here
frontend/app/page.tsx     # Frontend starts here
```

### Templates
```
admin/src/pages/Skills.jsx    # Complete CRUD example
admin/src/utils/api.js        # All API endpoints
server/routes/skills.js       # Backend API example
```

---

## 📚 DOCUMENTATION

| File | Purpose |
|------|---------|
| `QUICKSTART.md` | Get running in 5 min |
| `README.md` | Full overview |
| `SETUP_GUIDE.md` | API docs |
| `ADMIN_DEVELOPMENT_GUIDE.md` | Build admin pages |
| `MIGRATION_COMPLETE.md` | Migration summary |

---

## ✅ STATUS CHECK

**All Working:**
- [x] MongoDB connected
- [x] Backend API functional
- [x] Admin panel functional
- [x] Frontend migrated
- [x] Dependencies installed

**To Configure:**
- [ ] Cloudflare R2 (for uploads)
- [ ] Change admin password
- [ ] Update frontend to use API

---

## 🆘 TROUBLESHOOTING

**Server won't start:**
```powershell
cd server && npm install
```

**Can't login:**
```powershell
cd server && npm run seed
```

**File upload fails:**
- Configure Cloudflare R2 in `server/.env`
- See `SETUP_GUIDE.md` for instructions

**Port in use:**
```powershell
# Find process
netstat -ano | findstr :5000
# Kill process
taskkill /PID <id> /F
```

---

## 🎨 ADMIN PAGES

| Page | Status | Template |
|------|--------|----------|
| Login | ✅ Complete | - |
| Dashboard | ⬜ Placeholder | Add stats |
| Profile | ⬜ Placeholder | Single form |
| About | ⬜ Placeholder | Single form |
| **Skills** | **✅ COMPLETE** | **Use as template** |
| Tools | ⬜ Placeholder | Copy Skills |
| Projects | ⬜ Placeholder | Skills + upload |
| Certifications | ⬜ Placeholder | Copy Skills |
| Blog | ⬜ Placeholder | Skills + editor |
| Contact | ⬜ Placeholder | Read-only |

---

## 🎯 NEXT STEPS

### Today
1. ✅ Run `npm run seed`
2. ✅ Start all 3 services
3. ✅ Login to admin
4. ✅ Test Skills CRUD

### This Week
5. ⬜ Build 3-5 admin pages
6. ⬜ Configure Cloudflare R2
7. ⬜ Update frontend API calls

### When Ready
8. ⬜ Deploy backend
9. ⬜ Deploy admin
10. ⬜ Deploy frontend
11. ⬜ Go live!

---

## 💡 PRO TIPS

1. **Skills.jsx is your template** - Copy it for Tools, Certifications
2. **Keep terminals open** - Run all 3 services simultaneously
3. **Test often** - Check changes in admin before deploying
4. **Read docs** - Everything is documented in `/docs`
5. **MongoDB Atlas** - View your data in the cloud dashboard

---

## 🔗 QUICK LINKS

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000/api
- **Admin:** http://localhost:3001
- **Health Check:** http://localhost:5000/health
- **MongoDB:** https://cloud.mongodb.com
- **Cloudflare:** https://dash.cloudflare.com

---

**Made with ❤️ for Aadil Khan's Portfolio**  
**Stack:** Next.js • React • Node.js • Express • MongoDB • Cloudflare R2
