@echo off
echo ========================================
echo   Fully Automated Deployment
echo ========================================
echo.

REM Build the site
echo [1/4] Building site...
call powershell -ExecutionPolicy Bypass -Command "npm run build"
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo Done!
echo.

REM Commit to portfolio-live repo
echo [2/4] Committing to portfolio-live...
cd out

REM Check if git is initialized
if not exist .git (
    git init
    git remote add origin https://github.com/hijack-00/portfolio-live.git
)

git add .
git commit -m "Updated Changes"
if errorlevel 1 (
    echo No changes detected
)

git branch -M main
git push -u origin main --force
if errorlevel 1 (
    echo ERROR: Push to GitHub failed!
    cd ..
    pause
    exit /b 1
)
cd ..
echo Done!
echo.

REM Deploy to Hostinger using plink (automated password)
echo [3/4] Deploying to Hostinger...
echo Installing plink if needed...

REM Check if plink exists, if not download it
where plink >nul 2>nul
if errorlevel 1 (
    echo Downloading plink.exe...
    powershell -Command "Invoke-WebRequest -Uri 'https://the.earth.li/~sgtatham/putty/latest/w64/plink.exe' -OutFile 'plink.exe'"
    echo Done!
)

REM Use plink for automated SSH with password
echo Connecting to Hostinger...
echo Updating server...
plink -batch -ssh -P 65002 -pw "HiJack@110" u284898047@145.79.210.122 "cd domains/chillingon.com/public_html/Aadil/ && (if [ ! -d .git ]; then echo 'Initializing server...'; rm -rf * 2>/dev/null; rm -rf .* 2>/dev/null; git clone https://github.com/hijack-00/portfolio-live.git .; else echo 'Pulling latest changes...'; git fetch origin && git reset --hard origin/main; fi)"

if errorlevel 1 (
    echo.
    echo ERROR: Deployment to server failed!
    echo.
    echo Possible issues:
    echo - Path incorrect
    echo - Network issue
    echo - GitHub repository doesn't exist
    echo.
    pause
    exit /b 1
)
echo Done!
echo.

REM Update source repo
echo [4/4] Updating source repository...
git add .
git commit -m "Updated Live Changes"
git push origin main
echo Done!
echo.

echo ========================================
echo   DEPLOYMENT SUCCESSFUL!
echo ========================================
echo.
echo Your site is now live at:
echo https://aadil.chillingon.com
echo.
echo Changes deployed in ~30 seconds!
echo.
pause
