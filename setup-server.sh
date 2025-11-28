#!/bin/bash

echo "========================================="
echo "  Hostinger Server Setup"
echo "========================================="
echo ""

# Navigate to subdomain folder
echo "Navigating to subdomain folder..."
cd domains/chillingon.com/public_html/Aadil/

# Check if git repository already exists
if [ -d ".git" ]; then
    echo "Git repository already exists!"
    echo "Removing all files except .git..."
    
    # Remove all files and folders except .git
    find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
    
    # Pull latest changes
    echo "Pulling latest changes..."
    git pull origin main
else
    echo "First time setup - cloning repository..."
    
    # Remove everything
    rm -rf * 
    rm -rf .*  2>/dev/null
    
    # Clone repository
    git clone https://github.com/hijack-00/portfolio-live.git .
fi

echo ""
echo "Verifying files..."
ls -la

echo ""
echo "========================================="
echo "  Setup Complete!"
echo "========================================="
echo ""
echo "Your site should now be live at:"
echo "https://aadil.chillingon.com"
echo ""
