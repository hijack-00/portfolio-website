@echo off
echo ========================================
echo   Git Repository Setup
echo ========================================
echo.
echo This will initialize your Git repository
echo and prepare for GitHub deployment.
echo.
pause

REM Initialize Git
echo [1/5] Initializing Git repository...
git init
if errorlevel 1 (
    echo ERROR: Git initialization failed!
    echo Make sure Git is installed: https://git-scm.com
    pause
    exit /b 1
)
echo ✓ Git initialized!
echo.

REM Add .gitignore
echo [2/5] Creating .gitignore...
if exist .gitignore (
    echo ✓ .gitignore already exists!
) else (
    echo ERROR: .gitignore not found!
)
echo.

REM Add all files
echo [3/5] Staging all files...
git add .
echo ✓ Files staged!
echo.

REM Initial commit
echo [4/5] Creating initial commit...
git commit -m "Initial commit: Ethical hacker portfolio"
if errorlevel 1 (
    echo WARNING: Commit may have failed or no changes to commit
)
echo ✓ Committed!
echo.

REM Set main branch
echo [5/5] Setting main branch...
git branch -M main
echo ✓ Branch set to main!
echo.

echo ========================================
echo   ✅ Git Setup Complete!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Create repository on GitHub:
echo    https://github.com/new
echo.
echo 2. Connect your repository:
echo    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
echo.
echo 3. Push to GitHub:
echo    git push -u origin main
echo.
echo 4. See GIT_DEPLOYMENT_GUIDE.md for full instructions
echo.
pause
