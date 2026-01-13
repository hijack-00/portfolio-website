# 🚀 DEPLOYMENT GUIDE - Render + Vercel + Hostinger

## 📋 Current Setup:

- ✅ **Frontend:** Already on Hostinger
- 🔄 **Backend:** Deploy to Render
- 🔄 **Admin:** Deploy to Vercel

---

## PART 1: Setup Production Database (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for FREE account
3. Verify email

### Step 2: Create Database Cluster

1. Click "Build a Database"
2. Choose **FREE** tier (M0)
3. Provider: **AWS**
4. Region: Choose closest to you
5. Cluster Name: `portfolio-cluster`
6. Click "Create"

### Step 3: Create Database User

1. Security → Database Access
2. Click "Add New Database User"
3. Authentication: **Password**
4. Username: `portfolio_admin`
5. Password: Click "Autogenerate" (SAVE THIS!)
6. Database User Privileges: **"Read and write to any database"**
7. Click "Add User"

### Step 4: Whitelist IPs

1. Security → Network Access
2. Click "Add IP Address"
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String

1. Database → Connect
2. Click "Connect your application"
3. Driver: **Node.js**
4. Copy connection string:
```
mongodb+srv://portfolio_admin:<password>@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
5. Replace `<password>` with the password you saved
6. **SAVE THIS CONNECTION STRING!**

---

## PART 2: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to: https://render.com
2. Sign up with **GitHub**
3. Authorize Render

### Step 2: Create New Web Service

1. Dashboard → Click "New +"
2. Select **"Web Service"**
3. Click **"Build and deploy from a Git repository"**
4. Click "Next"

### Step 3: Connect Repository

1. Click **"Configure account"** if needed
2. Grant access to `portfolio-website` repo
3. Select **`portfolio-website`** repository
4. Click "Connect"

### Step 4: Configure Service

**Basic Settings:**
- **Name:** `portfolio-backend`
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** `server`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select **"Free"** (for testing)
- Or **"Starter"** ($7/month for production)

### Step 5: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```
MONGODB_URI = mongodb+srv://portfolio_admin:YOUR_PASSWORD@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

JWT_SECRET = your-super-secret-production-jwt-key-min-32-characters-long-change-this

PORT = 5000

NODE_ENV = production

R2_ACCOUNT_ID = 6e419af9c56e9772daee6809e3d93671

R2_ACCESS_KEY_ID = f661f5dc12239576b49f35640ad7f35c

R2_SECRET_ACCESS_KEY = d58ce19f934e1d23b5255b688c8b6cb631c3c6191bb2d9d794d7e8e84c747573

R2_BUCKET_NAME = portfolio-uploads

R2_ENDPOINT = https://6e419af9c56e9772daee6809e3d93671.r2.cloudflarestorage.com

R2_PUBLIC_URL = https://pub-YOUR-ID.r2.dev
```

**IMPORTANT:**
- Replace MongoDB password with YOUR actual password
- Replace JWT_SECRET with a strong random string
- Replace R2_PUBLIC_URL with your actual Cloudflare public URL

### Step 6: Deploy

1. Click **"Create Web Service"**
2. Wait for deployment (5-10 minutes)
3. When complete, you'll see URL like:
   ```
   https://portfolio-backend.onrender.com
   ```
4. **SAVE THIS URL!**

### Step 7: Test Backend

1. Visit: `https://portfolio-backend.onrender.com/health`
2. Should show backend status
3. If error, check Logs in Render dashboard

---

## PART 3: Update Backend CORS for Hostinger

### Step 1: Get Your Hostinger URLs

You need:
- Frontend URL: `https://yourdomain.com`
- Or: `https://subdomain.hostinger.com`

### Step 2: Update CORS in Backend

**File:** `server/server.js`

**Find:**
```javascript
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
```

**Replace with:**
```javascript
const corsOptions = {
  origin: [
    'https://yourdomain.com',              // Your Hostinger frontend
    'https://www.yourdomain.com',          // With www
    'https://portfolio-admin.vercel.app',  // Admin (will deploy next)
  ],
  credentials: true
};
```

### Step 3: Commit & Push

```bash
git add server/server.js
git commit -m "Update CORS for production"
git push origin main
```

Render will auto-redeploy!

---

## PART 4: Deploy Admin to Vercel

### Step 1: Create Vercel Account

1. Go to: https://vercel.com/signup
2. Sign up with **GitHub**
3. Authorize Vercel

### Step 2: Import Project

1. Dashboard → Click **"Add New..."**
2. Select **"Project"**
3. Click **"Import Git Repository"**
4. Select **`portfolio-website`**
5. Click **"Import"**

### Step 3: Configure Project

**Framework Preset:** **Vite**

**Root Directory:**
- Click **"Edit"**
- Enter: `admin`
- Save

**Build & Output Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Step 4: Add Environment Variables

Click **"Environment Variables"**

Add:
```
Name: VITE_API_URL
Value: https://portfolio-backend.onrender.com/api
```

(Use the Render URL from Part 2, Step 6)

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get URL like:
   ```
   https://portfolio-admin.vercel.app
   ```
4. **SAVE THIS URL!**

### Step 6: Password Protect Admin (IMPORTANT!)

1. Vercel Dashboard → Your Admin Project
2. Settings → **"Password Protection"**
3. Enable password protection
4. Set strong password
5. Save

**Or use Cloudflare Access for better security**

---

## PART 5: Update Hostinger Frontend

### Step 1: Update API URL

On your Hostinger hosting, update the API URL:

**Find:** `.env.production` or environment config

**Update:**
```
NEXT_PUBLIC_API_URL=https://portfolio-backend.onrender.com/api
```

### Step 2: Rebuild Frontend

If using Next.js on Hostinger:
```bash
npm run build
```

Upload the new build to Hostinger.

---

## PART 6: Test Everything

### Backend Test:
1. Visit: `https://portfolio-backend.onrender.com/health`
2. Should return: `{"status":"ok"}`

### Admin Test:
1. Visit: `https://portfolio-admin.vercel.app`
2. Login with: `admin@portfolio.com` / `Admin@12345`
3. Try editing a project
4. Should save successfully

### Frontend Test:
1. Visit your Hostinger site
2. Check all sections load
3. Submit contact form
4. Check message appears in admin

### Integration Test:
1. Admin → Edit a blog post
2. Save
3. Refresh frontend
4. Should see changes!

---

## 📊 Final Setup Summary:

| Component | Platform | URL |
|-----------|----------|-----|
| **Backend** | Render | `https://portfolio-backend.onrender.com` |
| **Admin** | Vercel | `https://portfolio-admin.vercel.app` |
| **Frontend** | Hostinger | `https://yourdomain.com` |
| **Database** | MongoDB Atlas | Cloud |
| **Storage** | Cloudflare R2 | Cloud |

---

## 🔐 Security Checklist:

- ✅ MongoDB: IP whitelist + strong password
- ✅ Backend: JWT_SECRET changed from default
- ✅ Admin: Password protected on Vercel
- ✅ Frontend: HTTPS on Hostinger
- ✅ CORS: Only allows your domains
- ✅ .env: Never committed to Git

---

## 💰 Costs:

- **MongoDB Atlas:** FREE (512MB)
- **Render (Free tier):** FREE but sleeps after 15min inactivity
- **Render (Starter):** $7/month - Always on, better performance
- **Vercel:** FREE (100GB bandwidth)
- **Cloudflare R2:** FREE (10GB storage)
- **Hostinger:** Your existing plan

**Recommended:** Use Render Free for testing, upgrade to Starter ($7/mo) for production.

---

## ⚡ Render Free Tier Notes:

**Free tier limitations:**
- Sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Good for testing, not ideal for production

**To prevent sleep:**
- Upgrade to Starter plan ($7/month)
- Or use a cron job to ping every 10 minutes

---

## 🆘 Troubleshooting:

### Backend won't start:
- Check Render logs
- Verify all env vars are set
- Check MongoDB connection string

### Admin can't connect to backend:
- Verify VITE_API_URL is correct
- Check CORS in backend allows admin domain
- Check browser console for errors

### Frontend can't fetch data:
- Update NEXT_PUBLIC_API_URL on Hostinger
- Rebuild frontend
- Check CORS allows Hostinger domain

---

## 🎉 You're Live!

**After deployment:**
- Backend: Processing API requests
- Admin: Managing content
- Frontend: Serving to users
- All connected and working!

**URLs to share:**
- **Portfolio:** `https://yourdomain.com`
- **Admin:** `https://portfolio-admin.vercel.app` (password protected)

---

## 📝 Next Steps:

1. ✅ Test all features in production
2. ✅ Add custom domain to Vercel admin (optional)
3. ✅ Setup monitoring (optional)
4. ✅ Configure backups (optional)
5. ✅ Add analytics (optional)

**Your portfolio is now fully deployed and live!** 🚀
