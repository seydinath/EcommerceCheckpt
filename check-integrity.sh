#!/bin/bash
# Project Integrity Check Script
# Verifies all essential files are in place and project is ready

echo "🔍 AgroMarket Project Integrity Check"
echo "====================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check frontend
echo "📱 Frontend Structure:"
files_frontend=(
  "src/main.tsx"
  "src/App.tsx"
  "src/pages/Auth.tsx"
  "src/pages/Products.tsx"
  "src/pages/ProductDetail.tsx"
  "src/components/Navbar.tsx"
  "package.json"
  "vite.config.ts"
)

for file in "${files_frontend[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✅${NC} $file"
  else
    echo -e "${RED}❌${NC} $file MISSING"
  fi
done

echo ""
echo "🖥️  Backend Structure:"

# Check backend
files_backend=(
  "server/server.js"
  "server/app.js"
  "server/db.js"
  "server/package.json"
  "server/models/User.js"
  "server/models/Product.js"
  "server/models/Category.js"
  "server/models/Request.js"
  "server/routes/auth.js"
  "server/routes/products.js"
  "server/routes/requests.js"
  "server/seed.js"
  "server/.env"
  "server/.env.example"
)

for file in "${files_backend[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✅${NC} $file"
  else
    echo -e "${RED}❌${NC} $file MISSING"
  fi
done

echo ""
echo "📚 Documentation:"

# Check documentation
files_docs=(
  "README.md"
  "QUICKSTART.md"
  "DEPLOYMENT.md"
  "MONGODB_ATLAS.md"
  "CLEANUP.md"
  "CLEANUP_SUMMARY.md"
  "DOCS_INDEX.md"
  "MIGRATION.md"
)

for file in "${files_docs[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✅${NC} $file"
  else
    echo -e "${RED}❌${NC} $file MISSING"
  fi
done

echo ""
echo "⚙️  Configuration:"

# Check config files
files_config=(
  "package.json"
  ".gitignore"
  "tsconfig.json"
  "vite.config.ts"
)

for file in "${files_config[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✅${NC} $file"
  else
    echo -e "${RED}❌${NC} $file MISSING"
  fi
done

echo ""
echo "🔑 Environment & Credentials:"

# Check .env
if grep -q "MONGODB_URI" server/.env; then
  echo -e "${GREEN}✅${NC} MONGODB_URI configured"
else
  echo -e "${YELLOW}⚠️${NC} MONGODB_URI not found in .env"
fi

if grep -q "JWT_SECRET" server/.env; then
  echo -e "${GREEN}✅${NC} JWT_SECRET configured"
else
  echo -e "${YELLOW}⚠️${NC} JWT_SECRET not found in .env"
fi

echo ""
echo "📊 Project Statistics:"

# Count files
echo "📁 Total files:"
echo "  - TypeScript/TSX: $(find src -name "*.tsx" -o -name "*.ts" | wc -l)"
echo "  - JavaScript: $(find server -name "*.js" | wc -l)"
echo "  - Markdown docs: $(ls -1 *.md 2>/dev/null | wc -l)"

# Count lines
echo ""
echo "📝 Lines of Code (approx):"
if command -v wc &> /dev/null; then
  echo "  - Frontend: $(find src -name "*.tsx" -o -name "*.ts" | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')"
  echo "  - Backend: $(find server -name "*.js" | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}')"
fi

echo ""
echo "✨ Integrity Check Complete!"
echo "============================="
echo ""
echo "Next steps:"
echo "1. Verify all ✅ marks (green)"
echo "2. Review .env configuration"
echo "3. Run: npm install && cd server && npm install"
echo "4. Run: npm run dev && (cd server && npm run dev)"
echo "5. Test: node server/seed.js"
echo ""
