# Portfolio Management System - Complete Setup Guide

## 📁 Folder Structure

```
hacker_theme/
├── frontend/          # Next.js Portfolio Website (to be moved)
├── server/           # Backend API (Node.js + Express + MongoDB)
├── admin/            # Admin Panel (React + Vite)
└── README.md
```

## 🚀 Setup Instructions

### 1. Server (Backend) Setup

```bash
cd server
npm install
npm run seed      # Initialize database with sample data
npm run dev       # Start development server on port 5000
```

**Server will run on:** `http://localhost:5000`

### 2. Admin Panel Setup

```bash
cd admin
npm install
npm run dev       # Start admin panel on port 3001
```

**Admin Panel will run on:** `http://localhost:3001`

**Default Login Credentials:**
- Email: `admin@portfolio.com`
- Password: `Admin@12345`

### 3. Frontend Setup (Current Next.js app)

The current Next.js app needs to be moved to the `frontend/` folder. For now, it runs as:

```bash
npm run dev       # Runs on port 3000
```

## 🗄️ Database Configuration

MongoDB Atlas is already configured in `server/.env`:
```
MONGODB_URI=mongodb+srv://khanaadil8299_db_user:49ND1in9RmcaNtEr@cluster0.aj6dmhh.mongodb.net/portfolio
```

## ☁️ Cloudflare R2 Storage Setup

### Step 1: Create Cloudflare R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2** from the sidebar
3. Click **Create Bucket**
4. Name it: `portfolio-assets`

### Step 2: Generate API Keys

1. In R2, go to **Manage R2 API Tokens**
2. Click **Create API Token**
3. Give permissions: **Object Read & Write**
4. Copy the **Access Key ID** and **Secret Access Key**

### Step 3: Configure Environment Variables

Update `server/.env`:

```env
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_ACCESS_KEY_ID=your_access_key_id_here
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_access_key_here
CLOUDFLARE_BUCKET_NAME=portfolio-assets
CLOUDFLARE_R2_ENDPOINT=https://[account-id].r2.cloudflarestorage.com
CLOUDFLARE_PUBLIC_URL=https://your-custom-domain.com
```

### Step 4: Configure Custom Domain (Optional)

1. In your R2 bucket settings, go to **Settings** → **Public Access**
2. Connect a custom domain from your Cloudflare account
3. Update `CLOUDFLARE_PUBLIC_URL` with your domain

**Example:**
- Without custom domain: Files accessible via Cloudflare R2 URL
- With custom domain: `https://cdn.yoursite.com/screenshots/image.png`

## 📡 API Endpoints

### Public Endpoints
- `GET /api/profile` - Get profile data
- `GET /api/about` - Get about content
- `GET /api/skills` - Get active skills
- `GET /api/tools` - Get active tools
- `GET /api/projects` - Get active projects
- `GET /api/certifications` - Get active certifications
- `GET /api/blog` - Get published blog posts
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Require Authentication)

#### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/init` - Initialize admin account

#### Profile & About
- `PUT /api/profile` - Update profile
- `PUT /api/about` - Update about content

#### Skills
- `GET /api/skills/all` - Get all skills (including inactive)
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

#### Tools
- `GET /api/tools/all` - Get all tools
- `POST /api/tools` - Create tool
-  `PUT /api/tools/:id` - Update tool
- `DELETE /api/tools/:id` - Delete tool

#### Projects
- `GET /api/projects/all` - Get all projects
- `POST /api/projects` - Create project (with file upload)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

#### Certifications
- `GET /api/certifications/all` - Get all certifications
- `POST /api/certifications` - Create certification
- `PUT /api/certifications/:id` - Update certification
- `DELETE /api/certifications/:id` - Delete certification

#### Blog
- `GET /api/blog/all` - Get all blog posts
- `POST /api/blog` - Create blog post
- `PUT /api/blog/:id` - Update blog post
- `DELETE /api/blog/:id` - Delete blog post

#### Contact
- `GET /api/contact` - Get all contact messages
- `GET /api/contact/:id` - Get single message (marks as read)
- `PUT /api/contact/:id/status` - Update message status
- `DELETE /api/contact/:id` - Delete message

#### File Upload
- `POST /api/upload` - Upload file to Cloudflare R2

## 🎨 Admin Panel Features

### Dashboard
- Overview statistics
- Recent contact messages
- Quick actions

### Profile Management
- Edit name, title, subtitle
- Manage typing texts
- Update contact information
- Resume URL configuration

### About Section
- Edit "Who Am I" content
- Update expertise description
- Modify services description
- Edit mission statement

### Skills Management
- Add/Edit/Delete skills
- Set skill level (Beginner, Intermediate, Advanced, Expert)
- Adjust progress percentage (0-100)
- Reorder skills
- Toggle active/inactive status

### Tools Management
- Add/Edit/Delete tools
- Choose RemixIcon icons
- Set proficiency status
- Reorder tools
- Toggle visibility

### Projects Management
- Add/Edit/Delete projects
- Upload screenshots (Cloudflare R2)
- Manage technologies used
- Set project status
- Add GitHub & live links
- Specify link type (website/APK)

### Certifications Management
- Add/Edit/Delete certifications
- Track progress percentage
- Manage topics/skills
- Set completion status

### Blog Management
- Create/Edit/Delete posts
- Rich text editor
- Set publish status
- Manage categories
- SEO-friendly slugs

### Contact Messages
- View all messages
- Mark as read/unread
- Update status (pending/replied/archived)
- Delete messages

## 🔧 Development Workflow

### 1. Start All Services

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Admin Panel:
```bash
cd admin
npm run dev
```

Terminal 3 - Frontend (current):
```bash
npm run dev
```

### 2. Make Changes
- Update content via Admin Panel (http://localhost:3001)
- Content is stored in MongoDB
- Files uploaded to Cloudflare R2

### 3. Frontend Integration

The frontend needs to be updated to fetch data from the API instead of using static data. Example:

```javascript
// Before (static)
const skills = [
  { name: 'Web Development', level: 'Expert', progress: 95 },
  // ...
];

// After (dynamic)
import { useEffect, useState } from 'react';

export default function Home() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data));
  }, []);

  // Render skills...
}
```

## 📝 Next Steps

### 1. Move Frontend Code

```bash
# Create frontend folder
mkdir frontend

# Move Next.js files (from root to frontend/)
# Move: app/, public/, package.json, next.config.ts, tailwind.config.js, etc.
```

### 2. Update Frontend to Use API

Replace all static data in `frontend/app/page.tsx` with API calls:
- Profile data → `GET /api/profile`
- About content  → `GET /api/about`
- Skills → `GET /api/skills`
- Tools → `GET /api/tools`
- Projects → `GET /api/projects`
- Certifications → `GET /api/certifications`
- Blog posts → `GET /api/blog`
- Contact form → `POST /api/contact`

### 3. Configure Environment Variables

`frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Deploy

- **Frontend:** Vercel, Netlify
- **Backend:** Railway, Render, Heroku, DigitalOcean
- **Database:** MongoDB Atlas (already configured)
- **Storage:** Cloudflare R2 (already configured)

## 🔒 Security Notes

- `.env` files are NOT in `.gitignore` as requested
- Change default admin password after first login
- Use strong JWT secret in production
- Enable CORS only for your domains in production
- Use HTTPS in production

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB Atlas allows connections from your IP
- Check credentials in `.env`

### Cloudflare R2 Upload Fails
- Verify API keys are correct
- Check bucket permissions
- Ensure bucket name matches configuration

### Admin Panel Login Fails
- Run `npm run seed` to create admin user
- Check server is running on port 5000
- Verify JWT_SECRET is set in `.env`

## 📞 Support

For issues or questions, check the logs:
- Server logs: Terminal running `npm run dev` in server/
- Admin logs: Browser console
- Database: MongoDB Atlas dashboard

---

**Created by:** Aadil Khan
**Version:** 1.0.0
**Last Updated:** 2026-01-13
