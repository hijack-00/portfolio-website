@echo off
echo ========================================
echo   Portfolio-Live Repository Setup
echo ========================================
echo.
echo This script will set up the portfolio-live repository
echo.
echo IMPORTANT: Before running this, make sure you've created
echo the 'portfolio-live' repository on GitHub!
echo.
echo Go to: https://github.com/new
echo Name: portfolio-live
echo.
pause

cd out

echo Initializing git in out folder...
git init

echo Adding remote repository...
git remote add origin https://github.com/hijack-00/portfolio-live.git

echo Adding all files...
git add .

echo Committing files...
git commit -m "Initial deployment - Portfolio live site"

echo Pushing to GitHub...
git branch -M main
git push -u origin main --force

cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next step: Setup Hostinger server
echo Run the commands in SSH_DEPLOYMENT_GUIDE.md
echo.
pause
