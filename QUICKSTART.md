# ⚡ QUICK START - Get Running in 5 Minutes

## 🎯 Goal
Get your backend server and admin panel running so you can start managing content.

## 📋 Prerequisites
- Current dev server stopped (press Ctrl+C)
- Node.js installed ✅
- Internet connection for MongoDB Atlas ✅

## 🚀 5-Minute Setup

### Step 1: Initialize Database (1 minute)
```powershell
cd server
npm run seed
```

**Expected Output:**
```
✅ Database seeded successfully!
Admin credentials:
Email: admin@portfolio.com
Password: Admin@12345
```

### Step 2: Start Backend (30 seconds)
Keep same terminal:
```powershell
npm run dev
```

**Expected Output:**
```
Server running in development mode on port 5000
MongoDB Connected: cluster0.aj6dmhh.mongodb.net
```

**✅ Backend is running!** Leave this terminal open.

### Step 3: Start Admin Panel (30 seconds)
Open **NEW terminal**:
```powershell
cd admin
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  ready in 543 ms

  ➜  Local:   http://localhost:3001/
  ➜  Network: use --host to expose
```

**✅ Admin panel is running!**

### Step 4: Login & Test (1 minute)
1. Open browser: http://localhost:3001
2. Login with:
   - Email: `admin@portfolio.com`
   - Password: `Admin@12345`
3. Click **Skills** in sidebar
4. Click **Add Skill** button
5. Fill form and click **Create**

**✅ If you can add a skill, everything works!**

## 🎉 You're Done!

You now have:
- ✅ Backend API running (port 5000)
- ✅ Admin panel running (port 3001)
- ✅ Database connected
- ✅ Full CRUD working (test with Skills)

## 📱 Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Backend API | http://localhost:5000 | Data storage |
| Admin Panel | http://localhost:3001 | Content management |
| Frontend | http://localhost:3000 | Public website (after migration) |

## 🔄 Daily Workflow

**To start working:**
```powershell
# Terminal 1
cd server
npm run dev

# Terminal 2
cd admin
npm run dev

# Terminal 3 (after frontend migration)
cd frontend
npm run dev
```

**To stop:**
- Press `Ctrl+C` in each terminal

## 🆘 If Something Goes Wrong

### "Port already in use"
Someone is using port 5000 or 3001:
```powershell
# Find and kill the process
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

### "Cannot connect to MongoDB"
- Check internet connection
- MongoDB Atlas connection string is in `server/.env`
- Make sure it's exactly: `mongodb+srv://khanaadil8299_db_user:49ND1in9RmcaNtEr@cluster0.aj6dmhh.mongodb.net/portfolio`

### "Login fails"
Run seed again:
```powershell
cd server
npm run seed
```

### Admin shows "Failed to load skills"
- Make sure backend is running (Terminal 1)
- Check http://localhost:5000/health (should show "OK")

## 📝 What's Next?

Now that it's running, you have 3 options:

### Option A: Keep Testing (Recommended)
- Test adding/editing/deleting skills
- Explore the admin panel
- Get familiar with the interface

### Option B: Move Frontend Files
- Follow `MIGRATION_GUIDE.md`
- Move Next.js app to `frontend/` folder
- Start frontend on port 3000

### Option C: Build More Admin Pages
- Follow `ADMIN_DEVELOPMENT_GUIDE.md`
- Copy the Skills.jsx pattern
- Implement Tools, Projects, Blog, etc.

## 🎓 Learning the System

1. **Backend** - Look at `server/routes/skills.js` to see how API works
2. **Admin** - Look at `admin/src/pages/Skills.jsx` to see full CRUD example
3. **Database** - Open MongoDB Atlas to see your data
4. **API** - Test endpoints: http://localhost:5000/api/skills

## ✅ Success Criteria

You're ready to move forward if:
- [ ] Both terminals show no errors
- [ ] You can login to admin panel
- [ ] Skills page loads
- [ ] You can add/edit/delete a skill
- [ ] Changes persist after refresh

**If all checked, congratulations! 🎉**

## 📚 Full Documentation

Once comfortable, read:
- `README.md` - Complete overview
- `SETUP_GUIDE.md` - Detailed API docs
- `ADMIN_DEVELOPMENT_GUIDE.md` - Build admin pages
- `PROJECT_SUMMARY.md` - Project status

---

**Welcome to your new portfolio management system!**

Your backend and admin panel are now fully functional. Content you create in the admin panel is automatically saved to MongoDB Atlas and accessible via the REST API.

**Happy managing! 🚀**
