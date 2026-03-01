# 🐎 Quick Commands Reference

## 🚀 Quick Start (5 minutes)

### Terminal 1 - Frontend
```bash
npm install
npm run dev
# Frontend on http://localhost:8080
```

### Terminal 2 - Backend
```bash
cd server
npm install
npm run dev
# Backend on http://localhost:5000
```

### Terminal 3 - Seed Database
```bash
cd server
node seed.js
# DB seeded with 2 users + 10 products
```

---

## 📱 Development

### Frontend Commands
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Runs on http://localhost:8080

# Build for production
npm build

# Preview production build
npm preview

# Lint code
npm run lint
```

### Backend Commands
```bash
# Install dependencies
cd server
npm install

# Start dev server (with auto-reload)
npm run dev

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🗄️ Database

### Seed Test Data
```bash
cd server
node seed.js
```

**Creates:**
- 2 test users (seller & farmer)
- 6 product categories
- 10 sample products
- All with realistic data

**Test Credentials:**
```
Email: seller@agromarket.com
Password: password123

Email: farmer@agromarket.com  
Password: password123
```

### Connect to MongoDB

#### Local MongoDB
```bash
# Start MongoDB server
mongod

# Or with Docker
docker run -d -p 27017:27017 mongo

# In server/.env:
MONGODB_URI=mongodb://localhost:27017/agromarket
```

#### MongoDB Atlas
```bash
# Update server/.env:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agromarket?retryWrites=true&w=majority
```

### MongoDB CLI
```bash
# Connect to local
mongosh

# Select database
use agromarket

# View collections
show collections

# Count documents
db.users.countDocuments()
db.products.countDocuments()
```

---

## 🧹 Cleanup & Maintenance

### Windows (PowerShell)
```powershell
# Run cleanup script
.\cleanup.ps1

# Only creates backups, you delete if ready
```

### Linux/Mac (Bash)
```bash
# Run cleanup script
bash cleanup.sh

# Only creates backups, you delete if ready
```

### What Cleanup Script Does
- Backs up deprecated models
- Removes test files
- Cleans build artifacts
- Creates/updates .gitignore

### Manual Cleanup
```bash
# Only after running cleanup script:
rm server/models/Cart.js
rm server/models/Order.js
rm server/routes/cart.js
rm server/routes/orders.js
```

---

## 🔍 Project Verification

### Check Project Integrity
```bash
# Linux/Mac
bash check-integrity.sh

# Windows PowerShell
# Run each check manually from script
```

### List Frontend Pages
```bash
ls -la src/pages/
```

### List Backend Routes
```bash
ls -la server/routes/
```

### List Database Models
```bash
ls -la server/models/
```

### List Documentation
```bash
ls -la *.md
```

---

## 📊 API Testing

### Test Backend Health
```bash
# Check if server is running
curl http://localhost:5000/api/health
# Should return: {"ok":true}
```

### Test with Thunder Client / Postman

#### Register User
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "role": "buyer",
  "phone": "777777777",
  "location": "Kenitra"
}
```

#### Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "seller@agromarket.com",
  "password": "password123"
}
```

#### Get Products
```
GET http://localhost:5000/api/products
```

#### Get Product Details
```
GET http://localhost:5000/api/products/:id
```

---

## 🔐 Environment Configuration

### Frontend (.env if needed)
```bash
# Not required for local dev
# But for production:
VITE_API_URL=https://your-backend-domain.com
```

### Backend (.env REQUIRED)
```bash
PORT=5000
NODE_ENV=development

# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/agromarket

# Or MongoDB Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/agromarket

# Auth
JWT_SECRET=dev_secret_key_change_in_production

# CORS
CORS_ORIGIN=http://localhost:8080

# Uploads
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

---

## 📚 Documentation Quick Access

| Document | Purpose | Read Time |
|----------|---------|-----------|
| **README.md** | Project overview | 5 min |
| **QUICKSTART.md** | Get started in 5 min | 5 min |
| **DEPLOYMENT.md** | Full architecture | 15 min |
| **MONGODB_ATLAS.md** | Database setup | 20 min |
| **CLEANUP.md** | Maintenance notes | 10 min |
| **CLEANUP_SUMMARY.md** | What's been done | 5 min |
| **FINAL_REPORT.md** | Complete summary | 10 min |
| **DOCS_INDEX.md** | Documentation map | 5 min |

---

## 🐛 Common Issues & Fixes

### Frontend won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend won't connect to DB
```bash
# Check MongoDB is running
mongod --version

# If not installed, install or use Atlas
# Update MONGODB_URI in server/.env
```

### Port already in use
```bash
# Frontend (8080)
lsof -i :8080
kill -9 <PID>

# Backend (5000)
lsof -i :5000
kill -9 <PID>

# Windows (use PowerShell as admin)
Get-NetTCPConnection -LocalPort 8080
```

### Module not found errors
```bash
# Frontend
npm install --legacy-peer-deps

# Backend
cd server && npm install
```

### Environment variables not loading
```bash
# Make sure you have server/.env file
# Not .env.example
# Check all required vars are set

# Debug: Restart servers after .env changes
```

---

## 🚀 Production Deployment

### Before Deploying
```bash
# 1. Test locally
npm run dev & (cd server && npm run dev)

# 2. Build frontend
npm run build

# 3. Create production .env
cp server/.env.example server/.env.production
# Edit with real credentials

# 4. Test seed data (optional)
NODE_ENV=development node server/seed.js
```

### Deploy Steps
```bash
# 1. Update MongoDB to Atlas
# 2. Set JWT_SECRET to strong value
# 3. Update CORS_ORIGIN
# 4. Build frontend: npm run build
# 5. Deploy to hosting (Vercel, Render, etc)
```

---

## 📦 Git Commands

### Initialize Repository
```bash
git init
git add .
git commit -m "Initial commit: AgroMarket v1.0.0"
```

### After Cleanup
```bash
git add .
git commit -m "chore: assainir projet et préparer MongoDB Atlas"
git push origin main
```

### Create Branch for Development
```bash
git checkout -b feature/your-feature
# Make changes
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

---

## 💾 Backup & Recovery

### Backup MongoDB Locally
```bash
# Export database
mongodump --db agromarket --out ./backup

# Import database
mongorestore --db agromarket ./backup/agromarket
```

### Backup to MongoDB Atlas
```bash
# Export from local
mongodump --db agromarket --out ./backup

# Import to Atlas
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net" ./backup/agromarket --db agromarket
```

---

## 🔄 Restart Everything

### When Something Goes Wrong
```bash
# Kill all processes
pkill -f "node"
pkill -f "vite"

# Wait 2 seconds
sleep 2

# Start fresh
npm run dev & (cd server && npm run dev)
```

---

## 📝 Log Files

### Check Logs
```bash
# Backend logs (in console during dev)
npm run dev

# Frontend logs (browser console)
# Open DevTools: F12 → Console

# Production logs (if deployed)
# Check hosting provider's dashboard
```

---

## 🎯 Useful Shortcuts

| What | How |
|------|-----|
| **Frontend URL** | http://localhost:8080 |
| **Backend URL** | http://localhost:5000 |
| **Health Check** | http://localhost:5000/api/health |
| **API Docs** | http://localhost:5000 |
| **Open DevTools** | F12 / Cmd+Option+I |
| **Reload Page** | F5 / Cmd+R |
| **Hard Refresh** | Ctrl+F5 / Cmd+Shift+R |
| **Open Git Bash** | Right-click → Git Bash Here |
| **Clear npm Cache** | npm cache clean --force |

---

## ⚡ Speed Tips

### Faster Installation
```bash
# Use yarn instead of npm (faster)
npm install -g yarn
yarn install

# Or use pnpm (even faster)
npm install -g pnpm
pnpm install
```

### Faster Development
```bash
# Use VS Code REST Client
# Create test.http file:
GET http://localhost:5000/api/health

# Run with Alt+C in VS Code
```

---

## 📞 Need Help?

1. **Not working?** → Check logs in console
2. **Error message?** → Search in documentation
3. **Stuck?** → Read QUICKSTART.md
4. **Database issues?** → Read MONGODB_ATLAS.md
5. **Architecture?** → Read DEPLOYMENT.md

---

**Last Updated:** March 1, 2026
**Project:** AgroMarket v1.0.0
**Status:** ✅ Production Ready
