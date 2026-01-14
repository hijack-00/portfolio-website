# 🔍 CORS ERROR TROUBLESHOOTING

## Step 1: Check What Backend URL Admin is Using

**Open browser console (F12) in your admin panel:**

1. Go to: https://portfolio-admin-weld-six.vercel.app
2. Press F12 → Console tab
3. Try to login
4. Look at the CORS error - it will show the URL it's trying to reach

**Tell me:**
- What URL is shown in the error?
- Example: `https://something.onrender.com/api/auth/login`

---

## Step 2: Check Vercel Environment Variables

1. **Go to:** https://vercel.com/dashboard
2. **Select:** portfolio-admin project
3. **Settings** → **Environment Variables**
4. **Check:** `VITE_API_URL` value

**What should it be?**
```
VITE_API_URL = https://YOUR-BACKEND.onrender.com/api
```

**Is it correct?**
- If wrong or missing, add/update it
- Then redeploy admin

---

## Step 3: Verify Backend is Live on Render

**Visit this URL in browser:**
```
https://YOUR-BACKEND.onrender.com/health
```

**Should return:**
```json
{"status":"ok"}
```

**If doesn't work:**
- Backend isn't deployed yet
- Or URL is wrong

---

## Step 4: Check Render Deployment Status

1. **Go to:** https://dashboard.render.com
2. **Click:** Your backend service
3. **Check:**
   - Latest commit should be: "Fix CORS: Remove trailing slashes"
   - Status should be: "Live" (green)
   - Not "Deploying" or "Failed"

**If still deploying:**
- Wait a few more minutes
- Render free tier can take 5-10 minutes

**If failed:**
- Check Logs tab for errors
- Might be env vars missing

---

## Step 5: Test CORS with curl

**In your terminal, run:**

```bash
curl -X OPTIONS https://YOUR-BACKEND.onrender.com/api/auth/login \
  -H "Origin: https://portfolio-admin-weld-six.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -i
```

**Should see:**
```
Access-Control-Allow-Origin: https://portfolio-admin-weld-six.vercel.app
```

**If not:**
- CORS isn't configured correctly
- Backend didn't deploy the fix

---

## 🔧 Common Issues:

### Issue 1: Admin Using Wrong Backend URL

**Check console error - if it shows:**
```
http://localhost:5000/api/auth/login  ❌
```

**Fix:**
- Vercel → Admin project → Settings → Env vars
- Add: `VITE_API_URL = https://YOUR-BACKEND.onrender.com/api`
- Redeploy admin

### Issue 2: Backend Not Deployed

**Check Render:**
- If still deploying, wait
- If failed, check logs
- If old commit, trigger manual deploy

### Issue 3: Render URL Changed

**Your backend URL might be:**
```
https://portfolio-backend-xxxx.onrender.com
```

**Check Render dashboard for the actual URL!**

### Issue 4: Environment Variables Missing

**Render → Backend → Environment:**
- Check all required vars are set
- Especially MONGODB_URI, JWT_SECRET
- If missing, backend won't start

---

## 🎯 Quick Diagnostic Commands:

**1. Test backend is alive:**
```bash
curl https://YOUR-BACKEND.onrender.com/health
```

**2. Test CORS:**
```bash
curl -X POST https://YOUR-BACKEND.onrender.com/api/auth/login \
  -H "Origin: https://portfolio-admin-weld-six.vercel.app" \
  -H "Content-Type: application/json" \
  -d '{"email":"test","password":"test"}' \
  -i
```

Look for `Access-Control-Allow-Origin` header.

---

## 📋 Tell Me:

**Copy and paste from browser console:**
1. The exact CORS error message
2. The URL it's trying to reach
3. What Vercel env var `VITE_API_URL` is set to

**Then I can tell you exactly what's wrong!**

---

## 🆘 Emergency Fix:

**If you need admin working NOW:**

**Run locally:**
1. Admin `.env` file:
   ```
   VITE_API_URL=https://YOUR-BACKEND.onrender.com/api
   ```
2. Run: `npm run dev` in admin folder
3. Access: http://localhost:3001
4. Works with production backend!

---

**Tell me the EXACT error message from browser console and I'll help fix it!**
