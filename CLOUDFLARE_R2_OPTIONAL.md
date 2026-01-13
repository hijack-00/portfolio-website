# 📦 Cloudflare R2 Setup Guide (OPTIONAL)

## ⚠️ Do You Need This?

**NO! This is completely OPTIONAL.**

Your portfolio works 100% without Cloudflare R2. This is ONLY needed if you want to upload project screenshots through the admin panel instead of manually adding them.

---

## 🎯 What Cloudflare R2 Does:

**With R2:**
- Upload images through admin panel
- Images stored in Cloudflare cloud
- Fast CDN delivery
- Professional image hosting

**Without R2:**
- Everything else works perfectly
- Use manual images in `/public/screenshots/`
- Or use external image URLs (GitHub, Imgur)

---

## ✅ Alternative (No R2 Needed):

### Option 1: Manual Images
1. Place images in `frontend/public/screenshots/`
2. In admin, use path: `/screenshots/my-project.png`
3. **Done!** No cloud setup needed.

### Option 2: External URLs
1. Host images on GitHub repo
2. Use raw GitHub URLs
3. Or use Imgur/other services
4. **Done!** No setup needed.

---

## ☁️ If You Still Want R2:

### Step 1: Create Cloudflare Account
1. Go to: https://dash.cloudflare.com/sign-up
2. Sign up for free account
3. Verify email

### Step 2: Create R2 Bucket
1. Dashboard → R2 Object Storage
2. Click "Create bucket"
3. Bucket name: `portfolio-uploads`
4. Location: Choose closest region
5. Click "Create bucket"

### Step 3: Get API Credentials
1. R2 → Overview → Manage R2 API Tokens
2. Click "Create API Token"
3. Token name: `portfolio-api`
4. Permissions: Read & Write
5. Click "Create API Token"
6. **Save these values:**
   ```
   Access Key ID: xxxxxxxxxxxx
   Secret Access Key: yyyyyyyyyyyy
   Account ID: zzzzzzzzzzzz
   ```

### Step 4: Get Public URL
1. R2 → Your bucket → Settings
2. "Public Access" section
3. Click "Allow Access"
4. Copy the Public URL:
   ```
   https://pub-xxxxxxxx.r2.dev
   ```

### Step 5: Update Backend .env
**File:** `server/.env`

**Add these lines:**
```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET_NAME=portfolio-uploads
R2_PUBLIC_URL=https://pub-xxxxxxxx.r2.dev
```

### Step 6: Restart Backend
```bash
# Stop backend (Ctrl+C)
cd server
npm run dev
```

### Step 7: Test Upload
1. Admin panel → Projects
2. Click "Add Project"
3. Upload screenshot
4. Should see success message
5. Image stored in R2!

---

## 💰 Cost:

**Cloudflare R2 Free Tier:**
- ✅ 10 GB storage - FREE
- ✅ 1 million read requests/month - FREE
- ✅ 1 million write requests/month - FREE
- ✅ Egress (downloads) - FREE!

**Perfect for portfolio use!**

---

## 🧪 Verify It's Working:

1. Upload image in admin
2. Check Cloudflare R2 dashboard
3. Should see image in bucket
4. Frontend should show image

---

## 🔧 Troubleshooting:

### Images Not Uploading:
- Check R2 credentials in `.env`
- Restart backend server
- Check browser console for errors
- Verify bucket name is correct

### Images Not Showing:
- Check public URL is correct
- Ensure bucket is set to "Public Access"
- Check image URL in browser directly

---

## 📝 Summary:

**Required?** NO ❌  
**Recommended?** Only if you want admin uploads  
**Cost?** FREE (10GB limit)  
**Setup Time?** ~10 minutes  

**Alternative:** Just use `/public/screenshots/` folder! ✅

---

## 🎯 My Recommendation:

**Start WITHOUT R2:**
1. Deploy everything first
2. Use manual images
3. If you need admin uploads later, add R2 then

**You can always add it later!**

---

**Your portfolio works perfectly without R2! Only add it if you specifically need admin-panel image uploads.** 🚀
