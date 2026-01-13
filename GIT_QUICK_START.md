# 🚀 Git Deployment - Quick Reference

## ⚡ For the Impatient

### First Time Setup (5 minutes)

```powershell
# 1. Initialize Git
.\setup-git.bat

# 2. Create repo on GitHub: https://github.com/new

# 3. Connect to GitHub (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Every Day Workflow (30 seconds)

```powershell
# Make your changes, then:
.\deploy.bat
```

That's it! Your changes are on GitHub.

---

## 🌐 Hostinger Deployment

### Method 1: GitHub Actions (Automatic - Best!)

**One-time setup:**

1. Go to GitHub → Your Repo → Settings → Secrets → New secret
2. Add these secrets:
   - `FTP_SERVER`: `ftp.yourdomain.com`
   - `FTP_USERNAME`: Your FTP username
   - `FTP_PASSWORD`: Your FTP password
   - `FTP_SERVER_DIR`: `/domains/subdomain.domain.com/public_html/`

**That's it!** Now every time you push to GitHub:
- ✅ Automatic build
- ✅ Automatic deployment
- ✅ Live in 2-3 minutes

### Method 2: Manual SSH Deploy

**Setup once on server:**

```bash
# SSH into Hostinger
ssh user@ssh.yourdomain.com -p 22

# Clone repo
cd ~
mkdir portfolio
cd portfolio
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .

# Install dependencies
npm install

# Configure deploy.sh (edit paths)
nano deploy.sh
chmod +x deploy.sh

# First build
./deploy.sh
```

**Every update:**

```bash
# SSH in
ssh user@ssh.yourdomain.com -p 22

# Deploy
cd ~/portfolio
./deploy.sh
```

---

## 📝 Command Cheat Sheet

### Local (Windows)

```powershell
# Setup
.\setup-git.bat                             # Initialize Git
git remote add origin URL                   # Connect to GitHub
git push -u origin main                     # First push

# Daily workflow
.\deploy.bat                                # Build + commit + push

# Manual workflow
npm run dev                                 # Test locally
npm run build                               # Build
git add .                                   # Stage changes
git commit -m "message"                     # Commit
git push origin main                        # Push to GitHub
```

### Server (Linux - Hostinger)

```bash
# Setup
git clone URL .                             # Clone repo
npm install                                 # Install deps
nano deploy.sh                              # Configure paths
chmod +x deploy.sh                          # Make executable

# Deploy
./deploy.sh                                 # Auto deploy

# Manual
git pull origin main                        # Get changes
npm install                                 # Update deps
npm run build                               # Build
cp -r out/* /path/to/public_html/           # Copy files
```

---

## 🎯 Deployment Options Comparison

| Method | Speed | Difficulty | Automation | Best For |
|--------|-------|------------|------------|----------|
| **GitHub Actions** | ⚡⚡⚡ | Easy | ✅ Full | Best choice! |
| **SSH + deploy.sh** | ⚡⚡ | Medium | ⚠️ Semi | No GitHub Actions |
| **Manual FTP** | ⚡ | Easy | ❌ None | One-time deploy |

---

## 🆘 Quick Troubleshooting

### Git push fails

```powershell
# Check remote
git remote -v

# Re-add remote
git remote remove origin
git remote add origin YOUR_URL
git push -u origin main
```

### GitHub Actions failing

1. Check secrets are set correctly
2. Verify FTP credentials
3. Check Actions tab for error logs

### SSH connection refused

- Verify SSH enabled in hPanel
- Check port (usually 22 or 65002)
- Try: `ssh -p 65002 user@server`

### Node.js not available on server

Use GitHub Actions instead - builds on GitHub, deploys via FTP

---

## ✅ Quick Checklist

**First Time Setup:**
- [ ] Run `setup-git.bat`
- [ ] Create GitHub repo
- [ ] Connect with `git remote add origin`
- [ ] Push with `git push -u origin main`
- [ ] Set up GitHub Actions secrets (optional)

**Daily Workflow:**
- [ ] Make changes locally
- [ ] Test with `npm run dev`
- [ ] Run `deploy.bat`
- [ ] Verify on GitHub
- [ ] (Automatic deploy if using Actions)

---

## 📞 Need Full Details?

- **Complete Guide**: `GIT_DEPLOYMENT_GUIDE.md`
- **GitHub Actions**: `.github/workflows/deploy.yml`
- **Server Script**: `deploy.sh`
- **Local Script**: `deploy.bat`

---

## 🎉 Pro Tips

1. **Use GitHub Actions** - Set it up once, never worry again
2. **Commit often** - Small commits are easier to debug
3. **Test locally first** - Run `npm run dev` before deploying
4. **Write good commit messages** - Future you will thank you
5. **Check Actions tab** - Monitor deployments on GitHub

---

**Your portfolio updates in 3 commands:**

```powershell
# Edit files
npm run dev  # Test

# Deploy
.\deploy.bat  # Done!
```

🚀 **That's it! Go build something awesome!** 🚀
