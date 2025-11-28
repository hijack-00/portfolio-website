@echo off
echo ========================================
echo   Live Site Deployment to Hostinger
echo ========================================
echo.

REM Build the site
echo [1/5] Building site...
call powershell -ExecutionPolicy Bypass -Command "npm run build"
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo Done!
echo.

REM Go to out folder and commit
echo [2/5] Committing built site...
cd out

REM Check if git is initialized
if not exist .git (
    echo Initializing git in out folder...
    git init
    git remote add origin https://github.com/hijack-00/portfolio-live.git
)

git add .
set /p commit_msg="Enter commit message: "
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo No changes to commit
    cd ..
    goto DEPLOY
)
echo Done!
echo.

REM Push to portfolio-live repo
echo [3/5] Pushing to GitHub (portfolio-live)...
git branch -M main
git push -u origin main --force
if errorlevel 1 (
    echo ERROR: Push failed!
    cd ..
    pause
    exit /b 1
)
cd ..
echo Done!
echo.

:DEPLOY
REM Update live site via SSH
echo [4/5] Updating live site via SSH...
echo Connecting to Hostinger...
ssh -p 65002 u284898047@145.79.210.122 "cd domains/chillingon.com/public_html/Aadil && git pull"
if errorlevel 1 (
    echo ERROR: SSH command failed!
    echo.
    echo Trying manual pull...
    pause
    exit /b 1
)
echo Done!
echo.

REM Also update source repo
echo [5/5] Pushing source code to GitHub...
git add .
git commit -m "%commit_msg%"
git push origin main
echo Done!
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your site is now live at:
echo https://aadil.chillingon.com
echo.
pause
