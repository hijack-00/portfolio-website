@echo off
setlocal EnableDelayedExpansion

echo ========================================
echo   AADIL'S PORTFOLIO - AUTO DEPLOYMENT
echo ========================================
echo.

REM ============================================
REM STEP 1: BUILD THE SITE
REM ============================================
echo [1/5] Building site...
call powershell -ExecutionPolicy Bypass -Command "npm run build"
if errorlevel 1 (
    echo.
    echo ERROR: Build failed! Please fix code errors.
    pause
    exit /b 1
)
echo ✓ Build successful!
echo.

REM ============================================
REM STEP 2: COMMIT TO PORTFOLIO-LIVE REPO
REM ============================================
echo [2/5] Preparing deployment files...
cd out

REM Initialize git if needed
if not exist .git (
    echo Initializing git repository...
    git init
    git remote add origin https://github.com/hijack-00/portfolio-live.git
)

REM Commit changes
git add .
git commit -m "Updated Portfolio - %date% %time%"
if errorlevel 1 (
    echo No changes detected in build
) else (
    echo ✓ Changes committed
)

REM Force push to GitHub
git branch -M main
git push -u origin main --force
if errorlevel 1 (
    echo.
    echo ERROR: Failed to push to GitHub!
    echo Check your internet connection and GitHub credentials.
    cd ..
    pause
    exit /b 1
)
cd ..
echo ✓ Pushed to GitHub!
echo.

REM ============================================
REM STEP 3: DOWNLOAD PLINK IF NEEDED
REM ============================================
where plink >nul 2>nul
if errorlevel 1 (
    echo [3/5] Downloading SSH tool (plink.exe)...
    powershell -Command "Invoke-WebRequest -Uri 'https://the.earth.li/~sgtatham/putty/latest/w64/plink.exe' -OutFile 'plink.exe'"
    if errorlevel 1 (
        echo ERROR: Failed to download plink.exe
        echo Please download manually from: https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html
        pause
        exit /b 1
    )
    echo ✓ SSH tool downloaded!
    echo.
)

REM ============================================
REM STEP 4: DEPLOY TO HOSTINGER
REM ============================================
echo [4/5] Deploying to Hostinger server...
echo Connecting via SSH...

REM Deploy with auto-initialization and error recovery
plink -batch -ssh -P 65002 -pw "HiJack@110" u284898047@145.79.210.122 "cd domains/chillingon.com/public_html/Aadil/ ^&^& if [ ! -d .git ]; then echo 'Initializing server...'; rm -rf *; git clone https://github.com/hijack-00/portfolio-live.git .; else echo 'Updating server...'; git fetch origin; git reset --hard origin/main; fi ^&^& echo 'Server updated!' ^&^& ls -lh | head -3"

if errorlevel 1 (
    echo.
    echo ========================================
    echo   DEPLOYMENT ERROR - ATTEMPTING RECOVERY
    echo ========================================
    echo.
    
    REM Try force recovery
    echo Forcing server reset...
    plink -batch -ssh -P 65002 -pw "HiJack@110" u284898047@145.79.210.122 "cd domains/chillingon.com/public_html/Aadil/ ^&^& rm -rf * ^&^& git clone https://github.com/hijack-00/portfolio-live.git . ^&^& echo 'Server reinitialized!'"
    
    if errorlevel 1 (
        echo.
        echo FATAL ERROR: Cannot connect to server!
        echo.
        echo Your files ARE on GitHub.
        echo Check: https://github.com/hijack-00/portfolio-live
        echo.
        pause
        exit /b 1
    )
)

echo ✓ Deployed to server!
echo.

REM ============================================
REM STEP 5: UPDATE SOURCE CODE REPO
REM ============================================
echo [5/5] Updating source repository...
git add . >nul 2>&1
git commit -m "Portfolio update - %date% %time%" >nul 2>&1
git push origin main >nul 2>&1
echo ✓ Source code updated!
echo.

REM ============================================
REM SUCCESS!
REM ============================================
echo ========================================
echo   ✓ DEPLOYMENT SUCCESSFUL!
echo ========================================
echo.
echo Your portfolio is now LIVE at:
echo https://aadil.chillingon.com
echo.
echo Changes deployed: %date% %time%
echo.
echo To see changes:
echo 1. Visit: https://aadil.chillingon.com
echo 2. Press: Ctrl + Shift + R (force refresh)
echo.
echo ========================================
pause
