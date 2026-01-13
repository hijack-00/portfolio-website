# 🚀 DEPLOYMENT GUIDE - Make Your Portfolio Live!

## 📋 Pre-Deployment Checklist

Before deploying, make sure:
- ✅ All features working locally
- ✅ Test data replaced with your real info
- ✅ Project screenshots uploaded (if using R2)
- ✅ Resume PDF ready
- ✅ Git committed all changes

---

## 🗄️ STEP 1: Setup Production Database (MongoDB Atlas)

### Create Free MongoDB Cluster:

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Sign up** for free account
3. **Create new cluster:**
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

4. **Create Database User:**
   - Security → Database Access → Add New User
   - Username: `portfolio_admin`
   - Password: Generate strong password (save it!)
   - User Privileges: Read & Write to any database

5. **Whitelist IP:**
   - Security → Network Access → Add IP Address
   - Choose: **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, restrict to your server IPs

6. **Get Connection String:**
   - Click "Connect" → "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://portfolio_admin:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your database password

---

## 🖥️ STEP 2: Deploy Backend (Choose One)

### Option A: Railway (Recommended - Easiest)

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **New Project** → Deploy from GitHub repo
4. **Select your repo** → Select `server` directory
5. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://portfolio_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
   PORT=5000
   NODE_ENV=production
   ```

6. **Deploy Settings:**
   - Start Command: `npm start`
   - Build Command: `npm install`
   - Root Directory: `/server`

7. **Get Your Backend URL:**
   - Example: `https://your-app.railway.app`

### Option B: Render

1. **Go to:** https://render.com
2. **New Web Service** → Connect GitHub
3. **Select repo** → Choose `server` directory
4. **Configure:**
   - Name: `portfolio-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `server`

5. **Add Environment Variables** (same as above)
6. **Get URL:** `https://portfolio-api.onrender.com`

### Option C: Heroku

1. **Install Heroku CLI**
2. **From server directory:**
   ```bash
   cd server
   heroku create your-portfolio-api
   heroku config:set MONGODB_URI="your-connection-string"
   heroku config:set JWT_SECRET="your-secret"
   git push heroku main
   ```

---

## 📱 STEP 3: Deploy Admin Panel (Vercel)

1. **Go to:** https://vercel.com
2. **Import Project** → From GitHub
3. **Select your repo**
4. **Configure:**
   - Framework Preset: **Vite**
   - Root Directory: **admin**
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Environment Variables:**
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```

6. **Deploy!**
   - Get URL: `https://portfolio-admin.vercel.app`

7. **⚠️ IMPORTANT - Secure Your Admin:**
   - After deploy, password protect it
   - Vercel → Settings → Password Protection
   - Or use Cloudflare Access

---

## 🌐 STEP 4: Deploy Frontend (Vercel)

1. **Vercel** → **New Project**
2. **Import** from GitHub
3. **Configure:**
   - Framework Preset: **Next.js**
   - Root Directory: **frontend**
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

5. **Deploy!**
   - Get URL: `https://your-portfolio.vercel.app`

---

## 🔐 STEP 5: Update CORS in Backend

**File:** `server/server.js`

**Change:**
```javascript
// OLD (Development)
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

// NEW (Production)
const corsOptions = {
  origin: [
    'https://your-portfolio.vercel.app',
    'https://portfolio-admin.vercel.app'
  ],
  credentials: true
};
```

**Redeploy backend** after this change!

---

## 📝 STEP 6: Update API URLs

### Frontend (.env.production):
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
```

### Admin (.env.production):
```
VITE_API_URL=https://your-backend.railway.app/api
```

---

## 🔑 STEP 7: Security Checklist

### Backend:
- ✅ Change `JWT_SECRET` to strong random string (32+ chars)
- ✅ Set `NODE_ENV=production`
- ✅ Update CORS to production URLs only
- ✅ MongoDB user has minimal permissions
- ✅ MongoDB IP whitelist (not 0.0.0.0/0 if possible)

### Admin Panel:
- ✅ Password protect with Vercel/Cloudflare
- ✅ Change default admin password
- ✅ Use strong password (min 12 chars)
- ✅ Consider 2FA

### Frontend:
- ✅ EmailJS keys in env vars (not hardcoded)
- ✅ API calls to HTTPS endpoints
- ✅ No sensitive data in client code

---

## 🎨 STEP 8: Custom Domains (Optional)

### Buy Domain (Choose One):
- **Namecheap** - Cheap, reliable
- **Google Domains** - Simple
- **Cloudflare** - Best for DNS

### Setup:

**Frontend (www.yourdomain.com):**
1. Vercel → Your Project → Settings → Domains
2. Add `yourdomain.com` and `www.yourdomain.com`
3. Update DNS records at domain provider

**Admin (admin.yourdomain.com):**
1. Vercel → Admin Project → Settings → Domains
2. Add `admin.yourdomain.com`

**Backend (api.yourdomain.com):**
1. Railway/Render → Settings → Custom Domain
2. Add `api.yourdomain.com`

---

## ☁️ STEP 9: Setup Cloudflare R2 (File Uploads)

**If you want project screenshot uploads:**

1. **Cloudflare Account** → R2
2. **Create Bucket:** `portfolio-uploads`
3. **Get Credentials:**
   - R2 API Token
   - Account ID
   - Bucket Name

4. **Update Backend .env:**
   ```
   R2_ACCOUNT_ID=your_account_id
   R2_ACCESS_KEY_ID=your_access_key
   R2_SECRET_ACCESS_KEY=your_secret_key
   R2_BUCKET_NAME=portfolio-uploads
   R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
   ```

---

## 🧪 STEP 10: Test Production

### Test Checklist:

**Backend:**
- [ ] Visit `https://your-backend.railway.app/health`
- [ ] Should return backend status

**Admin Panel:**
- [ ] Login with your credentials
- [ ] Create/edit a blog post
- [ ] Upload image (if R2 configured)
- [ ] Check all CRUD operations

**Frontend:**
- [ ] Visit your production URL
- [ ] Check all sections load
- [ ] Submit contact form
- [ ] Check message appears in admin
- [ ] Test all links (GitHub, LinkedIn, Resume)

---

## 📊 STEP 11: Monitoring & Analytics

### Add Google Analytics:
**File:** `frontend/app/layout.tsx`

```typescript
// Add in <head>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Monitor Backend:
- **Railway:** Built-in monitoring
- **Sentry:** Error tracking
- **LogRocket:** Session replay

---

## 💰 Cost Breakdown (Free Tier):

- **MongoDB Atlas:** FREE (512MB)
- **Railway:** FREE ($5 credit/month)
- **Vercel (Frontend):** FREE (100GB bandwidth)
- **Vercel (Admin):** FREE (100GB bandwidth)
- **Cloudflare R2:** FREE (10GB storage)
- **Domain:** ~$10-15/year

**Total: FREE for small traffic!**

---

## 🚨 Common Deployment Issues:

### Issue 1: Build Fails
**Solution:** Check logs, install missing dependencies

### Issue 2: API Not Connecting
**Solution:** Check CORS settings, verify API URL

### Issue 3: MongoDB Connection Error
**Solution:** Check connection string, IP whitelist

### Issue 4: 401 Errors in Admin
**Solution:** JWT secret must match, clear cookies

### Issue 5: Contact Form Not Working
**Solution:** Check API URL in frontend env

---

## 📚 Post-Deployment:

### Week 1:
- [ ] Monitor error logs
- [ ] Test all features
- [ ] Fix any issues
- [ ] Update content

### Month 1:
- [ ] Add Google Search Console
- [ ] Submit sitemap
- [ ] Check analytics
- [ ] Optimize performance

### Ongoing:
- [ ] Regular backups (MongoDB)
- [ ] Update dependencies
- [ ] Add new features
- [ ] Monitor uptime

---

## 🎉 YOU'RE LIVE!

**Your URLs:**
- **Frontend:** https://yourdomain.com or https://your-app.vercel.app
- **Admin:** https://admin.yourdomain.com or https://admin-app.vercel.app
- **API:** https://api.yourdomain.com or https://your-backend.railway.app

**Next Steps:**
1. Share your portfolio link!
2. Add to LinkedIn/Resume
3. Monitor analytics
4. Iterate and improve

---

## 🆘 Need Help?

**Check Logs:**
- Railway: Dashboard → Logs
- Vercel: Deployment → Function Logs
- Browser: F12 → Console

**Common Resources:**
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.mongodb.com

---

**Good luck with your deployment! 🚀**
