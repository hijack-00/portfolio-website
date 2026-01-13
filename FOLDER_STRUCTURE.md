# 📁 Complete Folder Structure

## Current Structure (Before Frontend Migration)

```
hacker_theme/
│
├── 📂 server/                         # Backend API (Node.js + Express)
│   ├── 📂 config/
│   │   ├── db.js                     # MongoDB connection
│   │   └── cloudflare.js             # Cloudflare R2 storage
│   │
│   ├── 📂 middleware/
│   │   ├── auth.js                   # JWT authentication
│   │   └── upload.js                 # Multer file upload
│   │
│   ├── 📂 models/                    # MongoDB Schemas
│   │   ├── About.js
│   │   ├── Admin.js
│   │   ├── Blog.js
│   │   ├── Certification.js
│   │   ├── Contact.js
│   │   ├── Profile.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   └── Tool.js
│   │
│   ├── 📂 routes/                    # API Endpoints
│   │   ├── about.js                  # GET, PUT /api/about
│   │   ├── auth.js                   # POST /api/auth/login
│   │   ├── blog.js                   # CRUD /api/blog
│   │   ├── certifications.js         # CRUD /api/certifications
│   │   ├── contact.js                # CRUD /api/contact
│   │   ├── profile.js                # GET, PUT /api/profile
│   │   ├── projects.js               # CRUD /api/projects
│   │   ├── skills.js                 # CRUD /api/skills
│   │   ├── tools.js                  # CRUD /api/tools
│   │   └── upload.js                 # POST /api/upload
│   │
│   ├── 📂 scripts/
│   │   └── seed.js                   # Database initialization
│   │
│   ├── .env                          # Environment variables
│   ├── package.json                  # Dependencies
│   └── server.js                     # Main server file
│
├── 📂 admin/                          # Admin Panel (React + Vite)
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── Layout.jsx            # Main layout with sidebar
│   │   │   └── Layout.css
│   │   │
│   │   ├── 📂 pages/                 # Admin Pages
│   │   │   ├── Login.jsx             # ✅ Login page
│   │   │   ├── Login.css
│   │   │   ├── Dashboard.jsx         # ⬜ Stats & overview
│   │   │   ├── Profile.jsx           # ⬜ Profile settings
│   │   │   ├── About.jsx             # ⬜ About content
│   │   │   ├── Skills.jsx            # ✅ COMPLETE CRUD example
│   │   │   ├── Tools.jsx             # ⬜ Tools management
│   │   │   ├── Projects.jsx          # ⬜ Projects with uploads
│   │   │   ├── Certifications.jsx    # ⬜ Certifications
│   │   │   ├── Blog.jsx              # ⬜ Blog posts
│   │   │   └── Contact.jsx           # ⬜ Messages inbox
│   │   │
│   │   ├── 📂 utils/
│   │   │   └── api.js                # API client (all endpoints)
│   │   │
│   │   ├── App.jsx                   # Main app with routing
│   │   ├── index.css                 # Global styles
│   │   └── main.jsx                  # Entry point
│   │
│   ├── index.html                    # HTML entry
│   ├── vite.config.js                # Vite configuration
│   ├── .env                          # API URL configuration
│   └── package.json                  # Dependencies
│
├── 📂 backend/                        # ⚠️ OLD - Can be deleted
│   └── models/                       # (Models copied to server/)
│
├── 📂 app/                            # ⬜ TO MOVE → frontend/app/
├── 📂 public/                         # ⬜ TO MOVE → frontend/public/
├── 📂 .next/                          # ⬜ TO MOVE → frontend/.next/
├── 📂 node_modules/                   # ⬜ TO MOVE → frontend/node_modules/
│
├── 📄 Documentation Files
│   ├── README.md                     # Main documentation
│   ├── QUICKSTART.md                 # 5-minute setup
│   ├── SETUP_GUIDE.md                # Detailed setup & API
│   ├── MIGRATION_GUIDE.md            # How to move frontend
│   ├── ADMIN_DEVELOPMENT_GUIDE.md    # Admin page templates
│   ├── PROJECT_SUMMARY.md            # Current status
│   └── FOLDER_STRUCTURE.md           # This file
│
├── 📄 Next.js Files (TO MOVE)
│   ├── package.json                  # ⬜ → frontend/
│   ├── package-lock.json             # ⬜ → frontend/
│   ├── next.config.ts                # ⬜ → frontend/
│   ├── next-env.d.ts                 # ⬜ → frontend/
│   ├── tailwind.config.js            # ⬜ → frontend/
│   ├── tsconfig.json                 # ⬜ → frontend/
│   ├── postcss.config.mjs            # ⬜ → frontend/
│   └── eslint.config.mjs             # ⬜ → frontend/
│
└── 📄 Other Files
    └── .gitignore                    # (.env removed from it)
```

## After Frontend Migration

```
hacker_theme/
│
├── 📂 frontend/                       # Next.js Portfolio Website
│   ├── 📂 app/
│   │   ├── 📂 components/
│   │   │   └── ParticlesBackground.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                  # Main portfolio page
│   │
│   ├── 📂 public/
│   │   ├── 📂 screenshots/           # Project screenshots
│   │   ├── favicon.ico
│   │   └── resume.html
│   │
│   ├── 📂 .next/                     # Build output
│   ├── 📂 node_modules/              # Dependencies
│   │
│   ├── .env.local                    # EmailJS configuration
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── next.config.ts
│   ├── next-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   └── eslint.config.mjs
│
├── 📂 server/                         # Backend API
│   └── (same as before)
│
├── 📂 admin/                          # Admin Panel
│   └── (same as before)
│
└── 📄 Documentation/
    └── (all .md files)
```

## Key Directories Explained

### 🔵 server/
**Purpose:** Backend REST API  
**Tech:** Node.js, Express, MongoDB, Cloudflare R2  
**Runs on:** http://localhost:5000  
**Status:** ✅ Complete and functional  

**Key Files:**
- `server.js` - Express server setup
- `routes/*.js` - API endpoints (10 files)
- `models/*.js` - MongoDB schemas (9 files)
- `.env` - Configuration (MongoDB URI included)

### 🟢 admin/
**Purpose:** Content management interface  
**Tech:** React, Vite, React Router, Axios  
**Runs on:** http://localhost:3001  
** Status:** ✅ Core complete, pages need implementation  

**Key Files:**
- `src/App.jsx` - Routing & authentication
- `src/pages/Skills.jsx` - **COMPLETE EXAMPLE**
- `src/pages/*.jsx` - Placeholder pages (easy to implement)
- `src/utils/api.js` - API client (all endpoints ready)

### 🟡 frontend/
**Purpose:** Public-facing portfolio website  
**Tech:** Next.js, React, TypeScript, Tailwind CSS  
**Runs on:** http://localhost:3000  
**Status:** ⬜ Needs to be moved from root  

**Key Files:**
- `app/page.tsx` - Main portfolio page (currently static)
- `app/components/*.tsx` - UI components
- `public/` - Static assets

## File Count Summary

| Directory | Files | Status |
|-----------|-------|--------|
| server/ | ~30 files | ✅ Complete |
| admin/ | ~15 files | ✅ Infrastructure ready |
| frontend/ | ~20 files | ⬜ To be moved |
| docs/ | 7 files | ✅ Complete |

## Important Files Reference

### Configuration Files
```
server/.env                    # Backend configuration
admin/.env                     # Admin API URL
frontend/.env.local            # EmailJS keys (after migration)
```

### Entry Points
```
server/server.js               # Backend starts here
admin/src/main.jsx             # Admin starts here
frontend/app/page.tsx          # Portfolio starts here
```

### Database Files
```
server/models/*.js             # 9 MongoDB models
server/scripts/seed.js         # Database initialization
```

### API Files
```
server/routes/*.js             # 10 API route files
admin/src/utils/api.js         # Frontend API client
```

### Documentation Files
```
README.md                      # Start here
QUICKSTART.md                  # Get running fast
SETUP_GUIDE.md                 # Complete reference
MIGRATION_GUIDE.md             # Move frontend
ADMIN_DEVELOPMENT_GUIDE.md     # Build admin pages
PROJECT_SUMMARY.md             # Current status
FOLDER_STRUCTURE.md            # This file
```

## Clean Up After Migration

Once frontend is moved, you can delete:
```
📂 backend/                    # Old backend folder (models copied to server/)
📂 .next/                      # (moved to frontend/)
📂 node_modules/               # (moved to frontend/)
📂 out/                        # (moved to frontend/)
📄 package.json                # (moved to frontend/)
📄 package-lock.json           # (moved to frontend/)
📄 *.config.*                  # (moved to frontend/)
```

## File Size Estimates

| Directory | Size |
|-----------|------|
| server/node_modules/ | ~50MB |
| admin/node_modules/ | ~140MB |
| frontend/node_modules/ | ~400MB |
| Total | ~600MB |

## Git Structure

```
.git/                          # Version control (root)
├── server/.git               # (optional) Separate backend repo
├── admin/.git                # (optional) Separate admin repo
└── frontend/.git             # (optional) Separate frontend repo
```

**Recommendation:** Keep one `.git/` at root for monorepo, or create separate repos for each service.

## Development Workflow

```
Working Directory: hacker_theme/

Terminal 1: cd server && npm run dev
Terminal 2: cd admin && npm run dev
Terminal 3: cd frontend && npm run dev

Edit files in: VSCode (open hacker_theme/ folder)
Test backend: Postman or curl
Test admin: http://localhost:3001
Test frontend: http://localhost:3000
Database: MongoDB Atlas dashboard
Storage: Cloudflare R2 dashboard
```

## Production Structure (After Deployment)

```
Production:
├── Backend: railway.app/render.com          (server/)
├── Admin: admin.yoursite.com                (admin/dist)
├── Frontend: yoursite.com                   (frontend/.next)
└── Database: MongoDB Atlas
    Storage: Cloudflare R2
```

---

**Legend:**
- ✅ = Complete and functional
- ⬜ = Needs work or migration
- ⚠️ = Old/deprecated, can be deleted
- 📂 = Folder
- 📄 = File

**Total Lines of Code:** ~5,000+  
**Total Files Created:** 50+  
**Ready for Production:** Yes (after frontend migration)
