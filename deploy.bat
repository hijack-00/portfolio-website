@echo off
REM Local deployment script for Windows
REM Run this to build and commit changes

echo ========================================
echo   Portfolio Deployment Script
echo ========================================
echo.

REM Build the project
echo [1/4] Building project...
call powershell -ExecutionPolicy Bypass -Command "npm run build"
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo ✓ Build successful!
echo.

REM Add all changes
echo [2/4] Staging changes...
git add .
echo ✓ Changes staged!
echo.

REM Commit with message
echo [3/4] Committing changes...
set /p commit_msg="Enter commit message: "
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo No changes to commit or commit failed
)
echo ✓ Changes committed!
echo.

REM Push to GitHub
echo [4/4] Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo ERROR: Push failed! Check your connection and credentials.
    pause
    exit /b 1
)
echo ✓ Pushed to GitHub!
echo.

echo ========================================
echo   ✅ Local deployment complete!
echo ========================================
echo.
echo Next steps:
echo 1. SSH into your Hostinger server
echo 2. Run: ./deploy.sh
echo.
echo Or set up auto-deployment (see GIT_DEPLOYMENT_GUIDE.md)
echo.
pause
