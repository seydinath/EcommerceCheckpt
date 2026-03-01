#!/bin/bash

# AgroMarket Project Cleanup Script
# This script removes deprecated models and files

echo "🧹 AgroMarket Project Cleanup"
echo "=============================="
echo ""

# Backup old files
echo "📦 Creating backup of deprecated models..."
mkdir -p server/deprecated 2>/dev/null || true
cp server/models/Cart.js server/deprecated/Cart.js.backup 2>/dev/null && echo "✅ Backed up Cart.js"
cp server/models/Order.js server/deprecated/Order.js.backup 2>/dev/null && echo "✅ Backed up Order.js"

# Remove test files
echo ""
echo "🗑️  Removing test files..."
rm -f server/uploads/categories/test.txt && echo "✅ Removed test.txt from categories"
rm -f server/uploads/products/test.txt && echo "✅ Removed test.txt from products"

# Remove node_modules cache
echo ""
echo "🧹 Removing build artifacts..."
rm -rf server/.turbo 2>/dev/null && echo "✅ Removed .turbo"
rm -rf server/.next 2>/dev/null && echo "✅ Removed .next" 
rm -rf dist 2>/dev/null && echo "✅ Removed dist"

# Create gitignore if not exists
echo ""
echo "📝 Updating .gitignore..."
if [ ! -f .gitignore ]; then
  cat > .gitignore << EOF
# Dependencies
node_modules/
.pnp
.pnp.js

# Environment variables
.env
.env.local
.env.*.local

# Build outputs
dist/
build/
.turbo/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*

# Deprecated backups
server/deprecated/

# Uploads (optional - comment out if needed)
server/uploads/*
!server/uploads/.gitkeep
EOF
  echo "✅ Created .gitignore"
else
  # Append missing entries
  echo "✅ .gitignore already exists"
fi

# Summary
echo ""
echo "✨ Cleanup Complete!"
echo "================="
echo ""
echo "📋 Deprecated models backed up in: server/deprecated/"
echo ""
echo "Next steps:"
echo "1. Review server/deprecated/ files if needed"
echo "2. Once verified, remove server/models/Cart.js and Order.js manually"
echo "3. Test application: npm run dev (frontend) and npm run dev (backend)"
echo "4. Commit changes to git"
echo ""
