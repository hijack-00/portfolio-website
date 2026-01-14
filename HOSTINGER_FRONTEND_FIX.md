# 🔧 FRONTEND NOT SHOWING DATA - FIX

## 🎯 The Problem:

Your Hostinger frontend is still pointing to:
- ❌ `http://localhost:5000/api` (local development)

**It should point to:**
- ✅ `https://portfolio-website-i30p.onrender.com/api` (production backend)

---

## ✅ SOLUTION - Update Frontend on Hostinger

### Step 1: Update API URL in Frontend Code

**File:** `frontend/app/page.tsx`

**Find all instances of:**
```typescript
'http://localhost:5000/api'
```

**Replace with:**
```typescript
'https://portfolio-website-i30p.onrender.com/api'
```

---

### Step 2: Create Production Environment File

**Create file:** `frontend/.env.production`

**Add:**
```env
NEXT_PUBLIC_API_URL=https://portfolio-website-i30p.onrender.com/api
```

---

### Step 3: Update page.tsx to Use Environment Variable

**File:** `frontend/app/page.tsx`

**Find lines like:**
```typescript
const response = await fetch('http://localhost:5000/api/profile');
```

**Replace with:**
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://portfolio-website-i30p.onrender.com/api';
const response = await fetch(`${API_URL}/profile`);
```

**Do this for ALL API calls:**
- `/api/profile`
- `/api/about`
- `/api/skills`
- `/api/tools`
- `/api/projects`
- `/api/certifications`
- `/api/blog`
- `/api/contact`

---

### Step 4: Rebuild Frontend

**In your terminal:**

```bash
cd frontend
npm run build
```

---

### Step 5: Upload to Hostinger

**After build completes:**

1. **Build output is in:** `frontend/.next/` or `frontend/out/`
2. **Upload to Hostinger** via:
   - FTP/SFTP
   - File Manager
   - Git deployment
3. **Upload the entire build folder**

---

### Step 6: Update CORS on Backend

**In `server/server.js`, make sure frontend URL is in CORS:**

```javascript
app.use(cors({
    origin: [
        'https://aadil.chillingon.com',
        'https://portfolio-admin-weld-six.vercel.app'
    ],
    credentials: true
}));
```

**If changed, commit and redeploy on Render.**

---

## 🔍 Check Current Frontend API URL

**Open Hostinger frontend in browser:**

1. Press **F12** → **Network** tab
2. Refresh page
3. Look for API calls
4. Check what URL they're trying to reach

**If you see:**
- `http://localhost:5000/api/...` ← Wrong! Update needed
- `https://portfolio-website-i30p.onrender.com/api/...` ← Correct!

---

## 📝 Quick Fix Script

**I can help you update all API calls. First, tell me:**

1. Are you using Next.js static export or server-side rendering?
2. How do you deploy to Hostinger (FTP, Git, cPanel)?

**Then I'll create the exact files you need!**

---

## 🎯 Expected Flow:

```
Frontend (Hostinger)
    ↓
    Fetch from: https://portfolio-website-i30p.onrender.com/api
    ↓
Backend (Render)
    ↓
    Returns data
    ↓
Frontend displays data
```

---

## ✅ After Fix:

1. ✅ Frontend calls production backend
2. ✅ CORS allows Hostinger domain
3. ✅ Data loads and displays
4. ✅ Everything works!

---

**Tell me what's in your `frontend/app/page.tsx` at the API fetch lines and I'll give you the exact code to fix it!**

Or just update all `http://localhost:5000/api` to `https://portfolio-website-i30p.onrender.com/api` and rebuild!
