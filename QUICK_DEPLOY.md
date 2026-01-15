# 🚀 Quick Start: Deploy with Fresh Data

## One-Command Deployment

```bash
cd frontend
npm run build
```

That's it! The `prebuild` script automatically fetches latest data.

---

## What Happens

```
npm run build
    ↓
AUTO: npm run fetch-data
    ↓
Fetching from Render... (may take 30-40s for cold start)
    ↓
✅ Updated defaultData.ts
    ↓
Building Next.js...
    ↓
Ready to deploy!
```

---

## Verify Fresh Data

```bash
# Check last update timestamp
grep "Last updated" app/utils/defaultData.ts

# Should show recent timestamp, like:
# Last updated: 2026-01-15T05:57:43.694Z
```

---

## Deploy to Hostinger

### Option 1: FTP/File Manager
1. Build: `npm run build`
2. Upload `out/` folder to Hostinger
3. Done!

### Option 2: Git Deploy (if configured)
```bash
npm run build
git add .
git commit -m "Deploy with fresh data"
git push
```

### Option 3: Automated (GitHub Actions)
1. Push code to GitHub
2. GitHub Actions runs daily
3. Auto-fetches and commits fresh data
4. Webhook triggers deployment (if configured)

---

## Manual Data Update (Without Building)

```bash
# Just update the data file
npm run fetch-data

# Check what changed
git diff app/utils/defaultData.ts

# Commit if needed
git add app/utils/defaultData.ts
git commit -m "Update portfolio data"
```

---

## Troubleshooting

### Data fetch fails?
```bash
# Check API is accessible
curl https://portfolio-website-i30p.onrender.com/api/profile

# Or manually fetch
npm run fetch-data
```

### Want force fresh build?
```bash
# Explicitly run both steps
npm run build:fresh
```

### Check build status
```bash
npm run build 2>&1 | tee build.log
```

---

## First Deployment Checklist

- [x] ✅ Run `npm run build` to fetch data and build
- [ ] ⏳ Verify `defaultData.ts` has recent timestamp
- [ ] ⏳ Test locally first: `npm run dev`
- [ ] ⏳ Upload/deploy to Hostinger
- [ ] ⏳ Test production site
- [ ] ⏳ Verify data loads instantly
- [ ] ⏳ Check status indicator appears  
- [ ] ⏳ Set up GitHub Actions (optional)

---

## GitHub Actions Setup (Optional)

### Already done! ✅
File: `.github/workflows/update-portfolio-data.yml`

### What it does:
- Runs daily at 2 AM UTC
- Fetches latest data
- Commits if changed
- Can trigger deploy webhook

### To enable:
1. Push code to GitHub
2. Go to Actions tab
3. Enable workflows
4. (Optional) Add `DEPLOY_WEBHOOK_URL` secret

### Manual trigger:
1. GitHub repo → Actions tab
2. "Update Portfolio Data" workflow
3. "Run workflow" button
4. Enter reason (optional)
5. Run!

---

## Testing Your Deployment

### Test 1: Initial Load
```
1. Open incognito window
2. Visit your site
3. Should see content instantly (<100ms)
4. Check status indicator (top-right)
```

### Test 2: Verify Real Data
```
1. Look at projects, skills, etc.
2. Should match your Render backend data
3. Not placeholders or "Loading..."
```

### Test 3: Browser Cache
```
1. Reload page (F5)
2. Should load even faster
3. Status shows "Using cached data"
4. Background fetch updates it
```

---

## Maintenance

### Update data before important deployment:
```bash
npm run fetch-data
npm run build
# Deploy
```

### Set up automatic updates:
GitHub Actions will handle it daily!

### Emergency data refresh:
```bash
npm run fetch-data
git add app/utils/defaultData.ts
git commit -m "Emergency data update"
git push
```

---

## Environment Variables

### Optional: Custom API URL
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

### For GitHub Actions:
Add to repo secrets:
- `API_URL` (optional)
- `DEPLOY_WEBHOOK_URL` (optional)

---

## Common Commands

| Command | Purpose |
|---------|---------|
| `npm run fetch-data` | Update defaultData.ts from server |
| `npm run build` | Auto-fetch + build |
| `npm run build:fresh` | Explicit fetch + build |
| `npm run dev` | Test locally |

---

## Success Indicators

✅ Build completes without errors  
✅ `defaultData.ts` has recent timestamp  
✅ File contains real data, not placeholders  
✅ Local test shows instant load  
✅ Production site loads fast  
✅ Status indicator works  
✅ Data matches backend  

---

## Need Help?

📚 **Full guides:**
- `BUILD_TIME_FETCH_GUIDE.md` - Build-time fetching
- `STALE_WHILE_REVALIDATE_GUIDE.md` - Browser caching
- `TESTING_CHECKLIST.md` - Complete testing

💡 **Quick reference:**
- `SWR_QUICK_REFERENCE.md`

🐛 **Debug tools:**
- Browser console → paste `/public/cache-debug.js`
- `portfolioDebug.help()`

---

**You're all set! Happy deploying! 🚀**

*Remember: Every build now includes fresh server data automatically!*
