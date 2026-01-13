# Portfolio Management System

A complete portfolio management solution with a **Next.js frontend**, **Node.js/Express backend**, and **React admin panel**.

## 🎯 Features

### Backend (Server)
- ✅ RESTful API with Express.js
- ✅ MongoDB Atlas integration
- ✅ JWT authentication
- ✅ File uploads to Cloudflare R2
- ✅ CRUD operations for all content
- ✅ Contact form handling

### Admin Panel
- ✅ Modern React UI with Vite
- ✅ Complete CRUD for all sections
- ✅ File upload support
- ✅ Dark theme with green accents
- ✅ Responsive design
- ✅ Real-time updates

### Frontend (Next.js)
- ✅ Cyber-themed portfolio
- ✅ Particle animations
- ✅ Contact form with EmailJS
- ✅ Responsive design
- ✅ Static export support

## 📁 Project Structure

```
hacker_theme/
├── frontend/          # Next.js portfolio (move existing files here)
├── server/           # Backend API
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   ├── config/       # Database & Cloudflare config
│   ├── middleware/   # Authentication & file upload
│   ├── scripts/      # Database seeding
│   ├── server.js     # Main server file
│   └── .env          # Environment variables
├── admin/            # Admin panel
│   ├── src/
│   │   ├── pages/    # Admin pages
│   │   ├── components/
│   │   └── utils/    # API utilities
│   ├── vite.config.js
│   └── .env
└── docs/             # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account (already configured)
- Cloudflare account (for R2 storage)

### Step 1: Move Frontend Files

**Stop the current dev server first** (Ctrl+C), then run:

```powershell
# Create frontend directory
New-Item -ItemType Directory -Force -Path frontend

# Move Next.js files
Move-Item -Path app -Destination frontend\
Move-Item -Path public -Destination frontend\
Move-Item -Path package.json -Destination frontend\
Move-Item -Path package-lock.json -Destination frontend\
Move-Item -Path next.config.ts -Destination frontend\
Move-Item -Path tailwind.config.js -Destination frontend\
Move-Item -Path tsconfig.json -Destination frontend\
Move-Item -Path postcss.config.mjs -Destination frontend\
Move-Item -Path eslint.config.mjs -Destination frontend\
Move-Item -Path next-env.d.ts -Destination frontend\
Move-Item -Path .next -Destination frontend\ -Force
Move-Item -Path node_modules -Destination frontend\ -Force
```

### Step 2: Install Dependencies

**Terminal 1 - Server:**
```powershell
cd server
npm install
```

**Terminal 2 - Admin:**
```powershell
cd admin
npm install
```

**Terminal 3 - Frontend:**
```powershell
cd frontend
npm install
```

### Step 3: Configure Environment

#### Server (.env - already created)
The MongoDB connection is already configured:
```env
MONGODB_URI=mongodb+srv://khanaadil8299_db_user:49ND1in9RmcaNtEr@cluster0.aj6dmhh.mongodb.net/portfolio
```

For Cloudflare R2, update these values:
```env
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_ACCESS_KEY_ID=your_access_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_key
CLOUDFLARE_BUCKET_NAME=portfolio-assets
CLOUDFLARE_R2_ENDPOINT=https://[account-id].r2.cloudflarestorage.com
CLOUDFLARE_PUBLIC_URL=https://your-cdn-domain.com
```

### Step 4: Initialize Database

```powershell
cd server
npm run seed
```

This creates:
- Admin user (admin@portfolio.com / Admin@12345)
- Sample skills, tools, projects, certifications, blog posts

### Step 5: Start All Services

**Terminal 1 - Backend:**
```powershell
cd server
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Admin Panel:**
```powershell
cd admin
npm run dev
# Runs on http://localhost:3001
```

**Terminal 3 - Frontend:**
```powershell
cd frontend
npm run dev
# Runs on http://localhost:3000
```

## 🔐 Default Login

Access admin panel at `http://localhost:3001`:

- **Email:** admin@portfolio.com
- **Password:** Admin@12345

**⚠️ Change these credentials after first login!**

## 🎨 Admin Panel Pages

| Page | Description | Features |
|------|-------------|----------|
| Dashboard | Overview & stats | Quick access to all sections |
| Profile | Personal information | Name, title, email, links, typing texts |
| About | About section content | Whoami, expertise, services, mission |
| Skills | Technical skills | Name, level, progress, ordering |
| Tools | Tools & technologies | Name, icon, status, ordering |
| Projects | Portfolio projects | Screenshots, tech stack, links, GitHub |
| Certifications | Courses & certs | Progress tracking, topics, status |
| Blog | Blog posts | Create posts, publish status, categories |
| Contact | Messages inbox | View submissions, mark as read |

## 📡 API Endpoints

### Public
- `GET /api/profile` - Get profile data
- `GET /api/about` - Get about content
- `GET /api/skills` - Get active skills
- `GET /api/tools` - Get active tools
- `GET /api/projects` - Get active projects
- `GET /api/certifications` - Get active certifications
- `GET /api/blog` - Get published posts
- `GET /api/blog/:slug` - Get single post
- `POST /api/contact` - Submit contact form

### Admin (Requires Authentication)
All admin endpoints require `Authorization: Bearer <token>` header.

See `SETUP_GUIDE.md` for complete API documentation.

## ☁️ Cloudflare R2 Setup

### 1. Create R2 Bucket
1. Go to Cloudflare Dashboard → R2
2. Create bucket named `portfolio-assets`

### 2. Generate API Keys
1. R2 → Manage R2 API Tokens
2. Create token with **Object Read & Write** permissions
3. Copy Access Key ID and Secret Access Key

### 3. Configure Custom Domain (Optional)
1. Bucket Settings → Public Access
2. Connect custom domain
3. Update `CLOUDFLARE_PUBLIC_URL` in `.env`

### 4. Update Server .env
```env
CLOUDFLARE_ACCOUNT_ID=abc123
CLOUDFLARE_ACCESS_KEY_ID=your_key
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret
CLOUDFLARE_BUCKET_NAME=portfolio-assets
CLOUDFLARE_R2_ENDPOINT=https://abc123.r2.cloudflarestorage.com
CLOUDFLARE_PUBLIC_URL=https://cdn.yoursite.com
```

## 🔄 Frontend Integration

Update `frontend/app/page.tsx` to use API instead of static data:

```javascript
// Example: Fetch skills from API
const [skills, setSkills] = useState([]);

useEffect(() => {
  fetch('http://localhost:5000/api/skills')
    .then(res => res.json())
    .then(data => setSkills(data))
    .catch(err => console.error(err));
}, []);
```

Do this for:
- Profile → `/api/profile`
- About → `/api/about`
- Skills → `/api/skills`
- Tools → `/api/tools`
- Projects → `/api/projects`
- Certifications → `/api/certifications`
- Blog → `/api/blog`
- Contact form → `POST /api/contact`

## 🛠️ Development Workflow

1. **Update content** in Admin Panel (http://localhost:3001)
2. **Content saved** to MongoDB Atlas
3. **Files uploaded** to Cloudflare R2
4. **Frontend fetches** latest data from API
5. **Changes appear** on website (http://localhost:3000)

## 📦 Deployment

### Backend
Deploy to: Railway, Render, Heroku, DigitalOcean

1. Push code to GitHub
2. Connect to deployment platform
3. Set environment variables
4. Deploy from `server/` directory

### Admin Panel
Deploy to: Vercel, Netlify

1. Build: `npm run build`  (from admin/)
2. Deploy `admin/dist` folder
3. Set `VITE_API_URL` environment variable

### Frontend
Deploy to: Vercel, Netlify

1. Build: `npm run build` (from frontend/)
2. Deploy
3. Set `NEXT_PUBLIC_API_URL` environment variable

## 🐛 Troubleshooting

### Server won't start
- Check MongoDB connection string
- Verify port 5000 isn't in use
- Run `npm install` in server/

### Admin panel login fails
- Ensure server is running
- Run `npm run seed` to create admin user
- Check browser console for errors

### File upload fails
- Verify Cloudflare R2 credentials
- Check bucket name and permissions
- Ensure file size under 50MB

## 📚 Documentation

- `SETUP_GUIDE.md` - Complete setup and API docs
- `MIGRATION_GUIDE.md` - Frontend migration steps
- `server/.env` - Environment configuration
- `admin/.env` - Admin panel configuration

## 🎯 Next Steps

1. ✅ Move frontend files to `frontend/` folder
2. ✅ Install all dependencies
3. ✅ Run database seed script
4. ✅ Start all three services
5. ⬜ Configure Cloudflare R2
6. ⬜ Update frontend to use API
7. ⬜ Customize admin credentials
8. ⬜ Deploy to production

## 📝 Notes

- `.env` files are **NOT in .gitignore** as requested
- MongoDB Atlas is pre-configured
- Default admin: admin@portfolio.com / Admin@12345
- Skills page in admin is fully functional (use as template for other pages)
- All placeholder pages can be built following Skills.jsx pattern

## 🤝 Support

For issues:
1. Check server logs (terminal running server)
2. Check browser console (admin panel)
3. Verify MongoDB connection
4. Test API endpoints using Postman
5. Review `SETUP_GUIDE.md`

---

**Built for:** Aadil Khan's Portfolio
**Stack:** Next.js + React + Node.js + Express + MongoDB + Cloudflare R2
**Version:** 1.0.0
**Date:** January 2026
