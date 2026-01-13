#!/bin/bash

echo "========================================="
echo "  Portfolio Update on Hostinger"
echo "========================================="
echo ""

# Navigate to website directory
cd /domains/chillingon.com/public_html/Aadil/ || exit 1

echo "Current directory: $(pwd)"
echo ""

# Pull latest changes from GitHub
echo "[1/4] Pulling latest code from GitHub..."
git pull origin main
if [ $? -ne 0 ]; then
    echo "ERROR: Git pull failed!"
    exit 1
fi
echo "✓ Code updated"
echo ""

# Install/update dependencies
echo "[2/4] Installing dependencies..."
npm install --production
echo "✓ Dependencies installed"
echo ""

# Build the website
echo "[3/4] Building website..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed!"
    exit 1
fi
echo "✓ Build successful"
echo ""

# Deploy built files
echo "[4/4] Deploying built files..."
rm -f index.html 404.html 2>/dev/null
rm -rf _next 2>/dev/null
mv out/* . 2>/dev/null
rm -rf out
echo "✓ Files deployed"
echo ""

echo "========================================="
echo "  ✓ UPDATE COMPLETE!"
echo "========================================="
echo ""
echo "Your website is now live at:"
echo "https://aadil.chillingon.com"
echo ""
echo "Last updated: $(date)"
echo ""
