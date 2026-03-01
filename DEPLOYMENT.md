# AgroMarket - Project Structure & Configuration

## 📁 Project Structure

```
EcommerceCheckpt/
├── 📦 Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable UI components
│   │   ├── api/            # API calls
│   │   ├── context/        # Global state (Auth, Cart, Wishlist)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities
│   │   ├── locales/        # Translations (FR, EN)
│   │   ├── theme/          # Theming
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── index.html
│
├── 🖥️  Backend (Node.js + Express)
│   ├── server/
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth middleware
│   │   ├── controllers/    # Route handlers
│   │   ├── uploads/        # File uploads
│   │   ├── seed.js        # Database seeding
│   │   ├── db.js          # MongoDB connection
│   │   ├── app.js         # Express app
│   │   ├── server.js      # Entry point
│   │   ├── package.json
│   │   └── .env
│
├── 📚 Documentation
│   ├── README.md
│   ├── MIGRATION.md       # Project transformation notes
│   ├── QUICKSTART.md      # Quick start guide
│   ├── CLEANUP.md         # Cleanup & deprecation notes
│   ├── MONGODB_ATLAS.md   # Atlas configuration guide
│   └── DEPLOYMENT.md      # Deployment instructions
│
├── ⚙️  Configuration Files
│   ├── package.json       # Root package (scripts)
│   ├── vercel.json        # Vercel deployment config
│   └── components.json    # shadcn/ui config
│
└── 🔧 Utility Scripts
    ├── cleanup.sh         # Linux/Mac cleanup
    └── cleanup.ps1        # Windows PowerShell cleanup
```

## 🗄️ Database Schema

### User (Authentication & Profiles)
```typescript
{
  _id: ObjectId,
  email: String (unique, indexed),
  passwordHash: String,
  fullName: String,
  role: "buyer" | "seller" | "farmer",
  businessName?: String,
  location: String,
  phone: String,
  description: String,
  avatar?: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Category
```typescript
{
  _id: ObjectId,
  name: String (unique),
  slug: String (unique),
  description: String,
  imageUrl?: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```typescript
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number,
  images: [String],
  stock: Number,
  unit: "kg" | "ton" | "liter" | "piece" | "bundle",
  category: String (enum),
  seller: ObjectId (ref User),
  isOrganic: Boolean,
  harvestDate?: Date,
  origin: String,
  rating: Number,
  reviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### ProductRequest
```typescript
{
  _id: ObjectId,
  product: ObjectId (ref Product),
  buyer: ObjectId (ref User),
  seller: ObjectId (ref User),
  quantity: Number,
  unit: String,
  proposedPrice: Number,
  status: "pending" | "accepted" | "completed" | "rejected",
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (seller only)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Requests (Product Negotiation)
- `GET /api/requests/my-requests` - User's requests
- `GET /api/requests/received` - Received requests (sellers)
- `POST /api/requests` - Create request
- `PUT /api/requests/:id/accept` - Accept request
- `PUT /api/requests/:id/reject` - Reject request
- `PUT /api/requests/:id/complete` - Complete request

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `GET /api/me` - Current user info

## 🚀 Environment Variables

### Server (.env)
```dotenv
# Server
PORT=5000
NODE_ENV=development|production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/agromarket

# Auth
JWT_SECRET=strong_secret_key_32+_chars

# CORS
CORS_ORIGIN=http://localhost:8080,https://yourdomain.com

# File Upload
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-password
```

## 📊 Active vs Deprecated

### ✅ Active Features
- User authentication (3 roles: buyer, seller, farmer)
- Product catalog with filtering
- Product request system (negotiation workflow)
- User profiles
- Category management
- Search functionality
- Multilingual (FR, EN)
- Currency in F CFA

### ⚠️ Deprecated (Can Remove)
- `Cart.js` model - Replaced by Request system
- `Order.js` model - Not integrated
- `routes/cart.js` - Replaced by `routes/requests.js`
- `routes/orders.js` - Not used

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication
- ✅ Role-based access control (RBAC)
- ✅ CORS protection
- ✅ MongoDB injection prevention (Mongoose)
- ✅ Rate limiting ready (not deployed yet)
- ✅ Input validation with Zod

## 📦 Dependencies

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS v4 (styling)
- shadcn/ui (component library)
- React Router (SPA navigation)
- React Query (server state)
- i18next (translations)
- Mantine (additional UI)
- React Hook Form (form management)

### Backend
- Node.js + Express 5.2.1
- MongoDB + Mongoose 9.0.1
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- CORS (cross-origin requests)
- Multer (file uploads)
- dotenv (environment variables)

## 🧪 Testing Data

### Test Users (From seed.js)
- **Seller:** seller@agromarket.com / password123
- **Farmer:** farmer@agromarket.com / password123

### Sample Data
- 6 Product Categories
- 10 Sample Products (Vegetables, Fruits, Grains, Dairy, Herbs)
- Test prices in F CFA
- Mock images from placeholder service

## 📈 Deployment Checklist

- [ ] Update `MONGODB_URI` to Atlas connection string
- [ ] Set strong `JWT_SECRET` in production
- [ ] Configure `CORS_ORIGIN` for your domain
- [ ] Set `NODE_ENV=production`
- [ ] Test all API endpoints
- [ ] Run seed script or import production data
- [ ] Set up SSL/HTTPS
- [ ] Configure automated backups
- [ ] Set up monitoring and alerts
- [ ] Document API changes
- [ ] Create user manual

## 🔄 Development Workflow

1. **Start Backend**
   ```bash
   cd server
   npm install
   npm run dev
   # Runs on http://localhost:5000
   ```

2. **Start Frontend**
   ```bash
   npm install
   npm run dev
   # Runs on http://localhost:8080
   ```

3. **Seed Database**
   ```bash
   cd server
   node seed.js
   ```

4. **Run Cleanup**
   ```bash
   # On Linux/Mac:
   bash cleanup.sh
   
   # On Windows PowerShell:
   .\cleanup.ps1
   ```

## 📞 Support

For issues or questions:
1. Check documentation files (README.md, QUICKSTART.md)
2. Review error messages in console
3. Check MongoDB connection (MONGODB_ATLAS.md)
4. Verify environment variables

---

**Last Updated:** March 1, 2026
**Version:** 1.0.0
**Author:** Seydith
**License:** UNLICENSED
