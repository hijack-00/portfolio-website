#!/bin/bash

# Deployment Script for Hostinger
# This script should be run on the Hostinger server

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Configuration
REPO_URL="https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"  # Replace with your repo
BRANCH="main"  # or master
PROJECT_DIR="/home/YOUR_USERNAME/portfolio"  # Replace with your path
PUBLIC_DIR="/home/YOUR_USERNAME/domains/subdomain.domain.com/public_html"  # Replace with your subdomain path

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}📂 Navigating to project directory...${NC}"
cd $PROJECT_DIR

echo -e "${BLUE}🔄 Pulling latest changes from GitHub...${NC}"
git pull origin $BRANCH

echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

echo -e "${BLUE}🔨 Building production site...${NC}"
npm run build

echo -e "${BLUE}🗑️  Cleaning public directory...${NC}"
rm -rf $PUBLIC_DIR/*

echo -e "${BLUE}📤 Copying files to public directory...${NC}"
cp -r out/* $PUBLIC_DIR/

echo -e "${BLUE}🔒 Setting correct permissions...${NC}"
find $PUBLIC_DIR -type f -exec chmod 644 {} \;
find $PUBLIC_DIR -type d -exec chmod 755 {} \;

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}🌐 Your site is live at your subdomain!${NC}"
