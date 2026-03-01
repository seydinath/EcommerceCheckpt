# AgroMarket Project Cleanup Script (Windows/PowerShell)
# This script removes deprecated files and prepares for MongoDB Atlas

Write-Host "🧹 AgroMarket Project Cleanup" -ForegroundColor Cyan
Write-Host "===============================`n" -ForegroundColor Cyan

# Create backup directory
Write-Host "📦 Creating backup of deprecated models..." -ForegroundColor Yellow
if (-Not (Test-Path "server/deprecated")) {
    New-Item -ItemType Directory -Path "server/deprecated" -Force | Out-Null
}

if (Test-Path "server/models/Cart.js") {
    Copy-Item "server/models/Cart.js" "server/deprecated/Cart.js.backup" -Force
    Write-Host "✅ Backed up Cart.js" -ForegroundColor Green
}

if (Test-Path "server/models/Order.js") {
    Copy-Item "server/models/Order.js" "server/deprecated/Order.js.backup" -Force
    Write-Host "✅ Backed up Order.js" -ForegroundColor Green
}

# Remove test files
Write-Host "`n🗑️  Removing test files..." -ForegroundColor Yellow
if (Test-Path "server/uploads/categories/test.txt") {
    Remove-Item "server/uploads/categories/test.txt" -Force
    Write-Host "✅ Removed test.txt from categories" -ForegroundColor Green
}

if (Test-Path "server/uploads/products/test.txt") {
    Remove-Item "server/uploads/products/test.txt" -Force
    Write-Host "✅ Removed test.txt from products" -ForegroundColor Green
}

# Remove build artifacts
Write-Host "`n🧹 Removing build artifacts..." -ForegroundColor Yellow
$artifacts = @(".turbo", ".next", "dist", "build")
foreach ($artifact in $artifacts) {
    if (Test-Path $artifact) {
        Remove-Item $artifact -Recurse -Force
        Write-Host "✅ Removed $artifact" -ForegroundColor Green
    }
}

# Create .gitignore if not exists
Write-Host "`n📝 Updating .gitignore..." -ForegroundColor Yellow
$gitignorePath = ".gitignore"
$gitignoreContent = @(
    "# Dependencies",
    "node_modules/",
    ".pnp",
    ".pnp.js",
    "",
    "# Environment variables",
    ".env",
    ".env.local",
    ".env.*.local",
    "",
    "# Build outputs",
    "dist/",
    "build/",
    ".turbo/",
    "",
    "# IDE",
    ".vscode/",
    ".idea/",
    "*.swp",
    "*.swo",
    "*~",
    "",
    "# OS",
    ".DS_Store",
    "Thumbs.db",
    "",
    "# Logs",
    "*.log",
    "npm-debug.log*",
    "yarn-debug.log*",
    "",
    "# Deprecated backups",
    "server/deprecated/",
    "",
    "# Uploads (optional - comment out if needed)",
    "server/uploads/*",
    "!server/uploads/.gitkeep"
) -join "`n"

if (-Not (Test-Path $gitignorePath)) {
    Set-Content -Path $gitignorePath -Value $gitignoreContent
    Write-Host "✅ Created .gitignore" -ForegroundColor Green
} else {
    Write-Host "✅ .gitignore already exists" -ForegroundColor Green
}

# Summary
Write-Host "`n✨ Cleanup Complete!" -ForegroundColor Green
Write-Host "=================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Deprecated models backed up in: server/deprecated/" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚡ Next steps:" -ForegroundColor Yellow
Write-Host "1. Review server/deprecated/ files if needed" -ForegroundColor White
Write-Host "2. Delete deprecated models (Cart.js, Order.js) when ready" -ForegroundColor White
Write-Host "3. Update MongoDB URI in server/.env for Atlas" -ForegroundColor White
Write-Host "4. Test: npm run dev (in frontend and backend)" -ForegroundColor White
Write-Host "5. Run seed script: node server/seed.js" -ForegroundColor White
Write-Host "6. Commit to git" -ForegroundColor White
Write-Host ""
