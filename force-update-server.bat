@echo off
echo ========================================
echo   Force Update Server
echo ========================================
echo.
echo This will force update the server with latest changes from GitHub
echo.
pause

plink -batch -ssh -P 65002 -pw "HiJack@110" u284898047@145.79.210.122 "cd domains/chillingon.com/public_html/Aadil/ && git fetch origin && git reset --hard origin/main && echo 'Server updated successfully!' && ls -lah"

echo.
echo ========================================
echo   Server Force Updated!
echo ========================================
echo.
echo Check your site: https://aadil.chillingon.com
echo Press Ctrl+Shift+R to force refresh
echo.
pause
