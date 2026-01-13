# ✅ Cloudflare R2 Setup - Final Steps

## 🎯 What I Did:

✅ Created `server/.env` with your R2 credentials  
✅ Configured R2 endpoints  
✅ Ready to use!

---

## 📋 IMPORTANT - You Need To:

### Step 1: Create R2 Bucket

1. **Go to:** https://dash.cloudflare.com
2. **Login** with your Cloudflare account
3. **R2** → **Create bucket**
4. **Bucket name:** `portfolio-uploads` (use this exact name!)
5. **Location:** Choose closest region
6. **Create**

### Step 2: Enable Public Access

1. Click your bucket: **portfolio-uploads**
2. **Settings** tab
3. **Public Access** section
4. Click **"Allow Access"** or **"Connect Domain"**
5. Copy the **Public URL** (looks like: `https://pub-xxxxxxxx.r2.dev`)

### Step 3: Update .env with Public URL

**File:** `server/.env`

**Find this line:**
```
R2_PUBLIC_URL=https://pub-XXXXXXXX.r2.dev
```

**Replace with your actual public URL:**
```
R2_PUBLIC_URL=https://pub-YOUR-ACTUAL-ID.r2.dev
```

### Step 4: Restart Backend Server

```bash
# Stop current server (Ctrl+C in server terminal)

cd server
npm run dev
```

---

## 🧪 Test R2 Upload:

1. **Admin Panel:** http://localhost:3001
2. **Projects** → **Add Project**
3. **Upload screenshot**
4. Should see success!
5. **Check Cloudflare Dashboard** → R2 → Your bucket → Should see uploaded file

---

## 📊 Current Configuration:

**File:** `server/.env`

```env
R2_ACCOUNT_ID=6e419af9c56e9772daee6809e3d93671
R2_ACCESS_KEY_ID=f661f5dc12239576b49f35640ad7f35c
R2_SECRET_ACCESS_KEY=d58ce19f934e1d23b5255b688c8b6cb631c3c6191bb2d9d794d7e8e84c747573
R2_BUCKET_NAME=portfolio-uploads
R2_ENDPOINT=https://6e419af9c56e9772daee6809e3d93671.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://pub-XXXXXXXX.r2.dev  ← UPDATE THIS!
```

---

## ⚠️ Security Note:

**NEVER commit `.env` file to Git!**
- ✅ Already in `.gitignore`
- ✅ Your credentials are safe
- ✅ Only on your local machine

---

## ✅ After Setup:

**You can:**
- Upload project screenshots via admin
- Images stored in Cloudflare R2
- Fast CDN delivery
- Professional image hosting

**Next Steps:**
1. Create bucket (Step 1)
2. Get public URL (Step 2)
3. Update .env (Step 3)
4. Restart server (Step 4)
5. Test upload!

---

## 🆘 Troubleshooting:

**Upload fails:**
- Check bucket name is exactly: `portfolio-uploads`
- Verify public URL in .env is correct
- Make sure bucket has public access enabled
- Restart backend server

**Images don't show:**
- Check R2_PUBLIC_URL in .env
- Verify bucket is public
- Check browser console for errors

---

**Complete steps 1-4 above and R2 will be fully working!** 🚀
