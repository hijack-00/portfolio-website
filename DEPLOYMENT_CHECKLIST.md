# ✅ Hostinger Deployment Checklist

## Before Upload
- [x] Build completed successfully (`npm run build`)
- [x] `out` folder generated
- [x] `.htaccess` file created in `out` folder
- [ ] Resume PDF added to `out` folder (if needed)

## During Upload
- [ ] Logged into Hostinger hPanel
- [ ] Subdomain created/verified
- [ ] All files from `out` folder uploaded
- [ ] File permissions set correctly
  - Files: 644
  - Folders: 755

## After Upload
- [ ] Site accessible at subdomain URL
- [ ] HTTPS/SSL enabled
- [ ] Homepage loads correctly
- [ ] All sections scroll smoothly
- [ ] Animations working (typing effect, matrix rain)
- [ ] Navigation menu functional
- [ ] Mobile view works properly
- [ ] 404 page displays correctly (test with invalid URL)
- [ ] Resume download link works (if applicable)
- [ ] Contact section displays properly

## Optimization
- [ ] GZIP compression enabled (via .htaccess)
- [ ] Browser caching enabled (via .htaccess)
- [ ] HTTPS redirect active (via .htaccess)
- [ ] Page load time acceptable (under 3 seconds)

## Testing URLs
- [ ] Main page: `https://yoursubdomain.yourdomain.com`
- [ ] 404 page: `https://yoursubdomain.yourdomain.com/invalid-page`
- [ ] Mobile test: Use browser dev tools or real device

## Performance Check
- [ ] Google PageSpeed Insights test
- [ ] GTmetrix analysis
- [ ] Mobile-friendly test

## Security
- [ ] SSL certificate active (padlock in browser)
- [ ] Security headers enabled (via .htaccess)
- [ ] No directory listing (via .htaccess)

---

## Quick Links

### Files Location
- Local build: `d:\Development\generated\hacker_theme\out\`
- Hostinger: `public_html/subdomain_name/`

### Documentation
- Full guide: See `DEPLOYMENT_GUIDE.md`
- Quick steps: See `QUICK_DEPLOY.md`

### Tools
- FileZilla FTP: https://filezilla-project.org
- Hostinger hPanel: https://hpanel.hostinger.com
- PageSpeed Insights: https://pagespeed.web.dev

---

**Last Updated**: 2025-11-29
