# Moving Frontend Files to Separate Folder

## Quick Migration Commands

Run these commands from the root directory (`d:\Development\generated\hacker_theme`):

```powershell
# Stop the running dev server first (Ctrl+C in the terminal running npm run dev)

# Create frontend directory
New-Item -ItemType Directory -Force -Path frontend

# Move Next.js files to frontend folder
Move-Item -Path app -Destination frontend\
Move-Item -Path public -Destination frontend\
Move-Item -Path package.json -Destination frontend\
Move-Item -Path package-lock.json -Destination frontend\
Move-Item -Path next.config.ts -Destination frontend\
Move-Item -Path next-env.d.ts -Destination frontend\
Move-Item -Path tailwind.config.js -Destination frontend\
Move-Item -Path tsconfig.json -Destination frontend\
Move-Item -Path postcss.config.mjs -Destination frontend\
Move-Item -Path eslint.config.mjs -Destination frontend\
Move-Item -Path .next -Destination frontend\ -Force
Move-Item -Path node_modules -Destination frontend\ -Force
Move-Item -Path out -Destination frontend\ -Force

# Move all MD documentation files (optional - keep them or move to frontend)
# Move-Item -Path *.md -Destination frontend\ -Force

# The .env.local file if it exists
# Move-Item -Path .env.local -Destination frontend\ -Force
```

## After Moving Files

### 1. Update Frontend package.json

The frontend is already configured. No changes needed.

### 2. Create .gitignore in frontend folder

```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
```

### 3. Start Frontend

```powershell
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

## Final Folder Structure

```
hacker_theme/
├── frontend/              # Next.js Portfolio Website
│   ├── app/
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   └── ...
├── server/               # Backend API (Node.js + Express + MongoDB)
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── middleware/
│   ├── scripts/
│   ├── package.json
│   ├── server.js
│   └── .env
├── admin/                # Admin Panel (React + Vite)
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── SETUP_GUIDE.md
└── MIGRATION_GUIDE.md
```

## Run All Three Apps

**Terminal 1 - Backend:**
```powershell
cd server
npm install
npm run seed     # First time only - creates admin user and sample data
npm run dev      # Runs on http://localhost:5000
```

**Terminal 2 - Admin Panel:**
```powershell
cd admin
npm install
npm run dev      # Runs on http://localhost:3001
```

**Terminal 3 - Frontend:**
```powershell
cd frontend
npm run dev      # Runs on http://localhost:3000
```

## Important Notes

- **Stop current dev server** before moving files
- The `node_modules` will be moved but you may want to delete and reinstall: `cd frontend && npm install`
- Keep the `.env.local` in frontend if you have EmailJS configuration
- Documentation files (*.md) can stay in root or move to frontend
- Binary files (.exe, .bat) should stay in root

## Next Step: Update Frontend to Use Backend API

After moving, you'll need to update `frontend/app/page.tsx` to fetch data from the backend instead of using static data. See SETUP_GUIDE.md for details.
