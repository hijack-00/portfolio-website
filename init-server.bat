@echo off
echo ========================================
echo   One-Time Server Initialization
echo ========================================
echo.
echo This will set up your Hostinger server for automated deployment
echo.
pause

REM Check if plink exists, if not download it
where plink >nul 2>nul
if errorlevel 1 (
    echo Downloading plink.exe...
    powershell -Command "Invoke-WebRequest -Uri 'https://the.earth.li/~sgtatham/putty/latest/w64/plink.exe' -OutFile 'plink.exe'"
    echo Done!
)

echo.
echo Connecting to Hostinger and setting up repository...
echo.

REM Initialize server with git repository
echo y | plink -ssh -P 65002 -pw "HiJack@110" u284898047@145.79.210.122 ^
"cd domains/chillingon.com/public_html/Aadil/ && ^
if [ -d .git ]; then ^
    echo 'Repository exists, pulling latest...'; ^
    git pull origin main; ^
else ^
    echo 'First time setup, cloning repository...'; ^
    rm -rf * 2>/dev/null; ^
    rm -rf .* 2>/dev/null; ^
    git clone https://github.com/hijack-00/portfolio-live.git .; ^
fi && ^
echo '' && ^
echo 'Files on server:' && ^
ls -la"

if errorlevel 1 (
    echo.
    echo ERROR: Server initialization failed!
    echo.
    echo Please check:
    echo - Internet connection
    echo - Hostinger server is accessible
    echo - GitHub repository exists
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SERVER INITIALIZED SUCCESSFULLY!
echo ========================================
echo.
echo Your server is now ready for automated deployment!
echo.
echo Next steps:
echo 1. Visit: https://aadil.chillingon.com to verify
echo 2. Use: deploy-auto.bat for all future deployments
echo.
pause
