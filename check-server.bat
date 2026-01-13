@echo off
echo ========================================
echo   Server Status Check
echo ========================================
echo.
echo Connecting to Hostinger to check server status...
echo.

plink -batch -ssh -P 65002 -pw "HiJack@110" u284898047@145.79.210.122 "cd domains/chillingon.com/public_html/Aadil/ && pwd && echo '---' && ls -lah && echo '---' && git status && echo '---' && git remote -v && echo '---' && git pull origin main"

echo.
echo ========================================
echo   Check Complete
echo ========================================
pause
