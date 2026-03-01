# 📚 AgroMarket - Documentation Index

## 🚀 Getting Started

| Document | Purpose | For Whom |
|----------|---------|----------|
| **README.md** | Project overview & features | Everyone |
| **QUICKSTART.md** | Quick setup in 5 minutes | Developers |
| **DEPLOYMENT.md** | Full architecture & checklist | DevOps/Leads |

## 🗄️ Database & Backend

| Document | Purpose | For Whom |
|----------|---------|----------|
| **MONGODB_ATLAS.md** | MongoDB Atlas setup guide | Backend engineers |
| **db.js** | Connection handler code | Backend engineers |
| **seed.js** | Database seeding script | QA/Testing |

## 🧹 Project Maintenance

| Document | Purpose | For Whom |
|----------|---------|----------|
| **CLEANUP.md** | Deprecated models & migration | Tech lead |
| **CLEANUP_SUMMARY.md** | Summary of cleanup completed | Project manager |
| **cleanup.ps1** | Windows cleanup script | Windows users |
| **cleanup.sh** | Linux/Mac cleanup script | Linux/Mac users |

## 🏗️ Architecture & Technical

| Document | Purpose | For Whom |
|----------|---------|----------|
| **MIGRATION.md** | Project transformation notes | Tech lead/Architects |
| **THEME.md** | Design system & theme | Frontend developers |

## 📋 Quick Reference

### File Structure
```
📁 AgroMarket/
├── 📁 src/              (Frontend React)
├── 📁 server/           (Backend Express)
├── 📚 Documentation/
│   ├── README.md
│   ├── QUICKSTART.md
│   ├── DEPLOYMENT.md
│   ├── MONGODB_ATLAS.md
│   ├── CLEANUP.md
│   ├── CLEANUP_SUMMARY.md
│   ├── MIGRATION.md
│   └── THEME.md
└── ⚙️ Config Files
```

### Database Models
```
User → Product ← Category
User → ProductRequest ← Product
```

**Active Models:** User, Product, Category, ProductRequest
**Deprecated:** Cart, Order

### API Endpoints (9 Routes)
```
/api/auth       → Authentication (login, signup, logout)
/api/products   → Product CRUD & search
/api/requests   → Product request workflow
/api/categories → Category management
/api/users      → User management
/api/me         → Current user profile
```

### Credentials & URLs
```
Backend:  http://localhost:5000
Frontend: http://localhost:8080
DB Local: mongodb://localhost:27017/agromarket
DB Atlas: mongodb+srv://user:pass@cluster.mongodb.net/agromarket
```

### Test Users (After Running seed.js)
```
Seller: seller@agromarket.com / password123
Farmer: farmer@agromarket.com / password123
```

## 🎯 Common Tasks

### Start Development
1. Read: **QUICKSTART.md**
2. Run: `npm install && npm start`

### Deploy to Production
1. Read: **DEPLOYMENT.md**
2. Read: **MONGODB_ATLAS.md**
3. Create Atlas cluster
4. Update `.env` with Atlas URI
5. Deploy backend & frontend

### Clean Up Project
1. Read: **CLEANUP.md** & **CLEANUP_SUMMARY.md**
2. Run cleanup script (Windows: `cleanup.ps1` or Linux: `cleanup.sh`)
3. Optionally delete deprecated models

### Understand Architecture
1. Read: **DEPLOYMENT.md** → Project Structure section
2. Read: **MIGRATION.md** → Understand transformation
3. Review: **THEME.md** → Design system

## 📞 Support By Topic

| Topic | Document | Section |
|-------|----------|---------|
| "How do I start?" | QUICKSTART.md | Setup |
| "How do I deploy?" | DEPLOYMENT.md | Deployment Checklist |
| "MongoDB issues?" | MONGODB_ATLAS.md | Troubleshooting |
| "What's deprecated?" | CLEANUP.md | Deprecated Features |
| "How does auth work?" | MIGRATION.md | Backend Implementation |
| "What's the design?" | THEME.md | Color/Typography |

## 🔍 Document Map

```
README.md (START HERE!)
    ├── What is AgroMarket?
    ├── Features
    ├── Tech Stack
    └── →  QUICKSTART.md (5-minute setup)

QUICKSTART.md
    ├── Installation
    ├── Running locally
    ├── Test data
    └── → DEPLOYMENT.md (for production)

DEPLOYMENT.md
    ├── Project structure
    ├── API endpoints
    ├── Environment vars
    ├── → MONGODB_ATLAS.md (for database)
    └── → MIGRATION.md (for architecture)

MONGODB_ATLAS.md
    ├── Create cluster
    ├── Get connection string
    ├── Whitelist IP
    └── Troubleshooting

CLEANUP.md
    ├── Deprecated models
    ├── What to remove
    ├── Recommended cleanup
    └── → cleanup.ps1 or cleanup.sh

MIGRATION.md
    ├── From floral shop
    ├── To agricultural market
    ├── Three user roles
    └── Product request system

THEME.md
    ├── Colors
    ├── Typography
    ├── Components
    └── Customization

CLEANUP_SUMMARY.md (YOU ARE HERE!)
    ├── What's been done
    ├── Current status
    └── Next steps
```

## 🟢 Current Status

### ✅ Completed
- 3-role authentication system
- Product catalog with filtering
- Product request negotiation workflow
- User profiles & management
- 10 sample products + 6 categories
- French & English (Arabic removed)
- All prices in F CFA
- Database seeding script
- MongoDB Atlas ready
- Complete documentation
- Cleanup scripts provided

### ⚠️ Deprecated
- Cart model (→ Use requests)
- Order model (→ Not integrated)
- Order routes (→ Use requests)

### 🔄 Next (Optional)
1. Run cleanup script
2. Delete deprecated models
3. Migrate to MongoDB Atlas
4. Deploy to production

## 📊 Statistics

- **Lines of Code:** ~5,000+
- **API Endpoints:** 17+
- **Database Collections:** 4 active
- **Frontend Pages:** 11
- **Test Users:** 2
- **Sample Products:** 10
- **Languages Supported:** 2 (FR, EN)
- **Documentation Pages:** 8
- **Cleanup Scripts:** 2

## 🎓 Learning Path

1. **Beginner** → QUICKSTART.md
2. **Intermediate** → DEPLOYMENT.md + MIGRATION.md
3. **Advanced** → MONGODB_ATLAS.md + source code
4. **DevOps** → DEPLOYMENT.md + cleanup scripts

## 🆘 Stuck?

1. Check the documentation index above
2. Read the relevant guide from the table
3. Look for "Troubleshooting" section
4. Check error message against document keywords

## 📝 Document Versions

| Document | Version | Last Updated |
|----------|---------|--------------|
| README.md | 1.0 | March 1, 2026 |
| QUICKSTART.md | 1.0 | March 1, 2026 |
| DEPLOYMENT.md | 1.0 | March 1, 2026 |
| MONGODB_ATLAS.md | 1.0 | March 1, 2026 |
| CLEANUP.md | 1.0 | March 1, 2026 |
| CLEANUP_SUMMARY.md | 1.0 | March 1, 2026 |
| MIGRATION.md | 1.0 | March 1, 2026 |
| THEME.md | 1.0 | March 1, 2026 |

---

**Project:** AgroMarket v1.0.0
**Status:** ✅ Production Ready
**Author:** Seydith
**Last Updated:** March 1, 2026

For quick start: → **[QUICKSTART.md](QUICKSTART.md)**
For setup: → **[DEPLOYMENT.md](DEPLOYMENT.md)**
For database: → **[MONGODB_ATLAS.md](MONGODB_ATLAS.md)**
