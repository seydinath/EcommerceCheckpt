# AgroMarket - Agriculture E-Commerce Platform

A modern, feature-rich agricultural e-commerce platform connecting farmers, sellers, and buyers. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

**Owner:** Seydith  
**All rights reserved © 2026 Seydith**

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Prerequisites](#prerequisites)
5. [Setup & Installation](#setup--installation)
6. [Running the Application](#running-the-application)
7. [Database](#database)
8. [API Documentation](#api-documentation)
9. [License](#license)

---

## Features

- **Role-Based Access**: Buyers, Sellers, and Farmers with distinct functionalities
- **Product Request System**: Buyers can request specific products and quantities from sellers/farmers
- **Agricultural Marketplace**: Natural color scheme optimized for farming commerce
- **Multi-language Support**: Full localization in English and French via i18n
- **Performance Optimized**: Lazy loading for pages, components, and images
- **Real-time Updates**: Notifications for product requests and seller responses
- **Seller/Farmer Dashboard**: Complete management interface for products and requests
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- **Shopping Cart**: Persistent cart with product management
- **Wishlist System**: Save favorite products for later
- **Product Categories**: Well-organized agricultural product categories
- **Search & Filter**: Advanced product discovery and filtering

## Tech Stack

### Frontend

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Shadcn/ui, Mantine UI
- **State Management**: React Context API (Auth, Cart, Wishlist)
- **Routing**: React Router DOM with lazy loading
- **Internationalization**: react-i18next (EN, FR)
- **Icons**: Lucide React
- **HTTP Client**: Fetch API with custom wrapper
- **UI Components**: Custom + shadcn/ui component library

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **File Uploads**: Multer for product images
- **Environment**: dotenv for configuration management

### Data Models

- **User**: Three roles (Buyer, Seller, Farmer) with authentication
- **Product**: Agricultural products with images, pricing, and inventory
- **Category**: Product categorization (vegetables, fruits, grains, dairy, etc.)
- **Request**: Product request management between buyers and sellers
- **Cart**: Shopping cart management

## Project Structure

```
EcommerceCheckpt/
├── src/                          # Frontend React application
│   ├── pages/                    # Page components (lazy-loaded)
│   │   ├── Index.tsx            # Home page
│   │   ├── Products.tsx         # Products catalog
│   │   ├── ProductDetail.tsx    # Single product view
│   │   ├── Cart.tsx             # Shopping cart
│   │   ├── Wishlist.tsx         # Saved items
│   │   ├── Auth.tsx             # Login/Register
│   │   ├── Profile.tsx          # User profile
│   │   ├── Admin.tsx            # Admin dashboard
│   │   └── ...
│   ├── components/               # Reusable components
│   │   ├── Navbar.tsx           # Navigation header
│   │   ├── Footer.tsx           # Footer
│   │   ├── ProductCard.tsx      # Product display card
│   │   ├── admin/               # Admin-specific components
│   │   └── ui/                  # UI component library
│   ├── context/                 # Global state providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   ├── CartContext.tsx      # Shopping cart state
│   │   └── WishlistContext.tsx  # Wishlist state
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions
│   │   └── api.ts              # API configuration
│   ├── locales/                 # Translation files
│   │   ├── english.json        # English translations
│   │   └── frensh.json         # French translations
│   ├── theme/                   # Theming
│   ├── App.tsx                 # Root component
│   └── main.tsx                # Entry point
├── server/                       # Express backend
│   ├── controllers/              # Route handlers
│   ├── middleware/               # Express middleware
│   ├── models/                   # Mongoose schemas
│   ├── routes/                   # API routes
│   ├── uploads/                  # File upload directory
│   ├── .env                     # Environment variables
│   ├── db.js                    # MongoDB connection
│   ├── server.js               # Express server setup
│   └── package.json
├── public/                       # Static assets
├── package.json                 # Frontend dependencies
├── vite.config.ts              # Vite configuration
└── README.md                    # This file
```

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- MongoDB instance (local or MongoDB Atlas)
- Git for version control

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/seydinath/EcommerceCheckpt.git
cd EcommerceCheckpt
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Environment Configuration

**Create `.env` file in the root directory:**

```env
VITE_API_URL=http://localhost:5000
```

**Create `.env` file in the `server/` directory:**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agromarket
JWT_SECRET=your_secure_jwt_secret_key_here
CORS_ORIGIN=http://localhost:8080
```

## Running the Application

### Development Mode

**Terminal 1 - Frontend:**

```bash
npm run dev
# Frontend available at http://localhost:8080
```

**Terminal 2 - Backend:**

```bash
cd server
npm run dev
# Backend API available at http://localhost:5000
```

### Production Build

**Frontend:**

```bash
npm run build
npm run preview
```

**Backend:**

```bash
cd server
npm start
```

---

## Database

### MongoDB Atlas Connection

The application is configured to connect to MongoDB Atlas cloud database:

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user with credentials
4. Whitelist your IP address (0.0.0.0/0 for development)
5. Update `MONGODB_URI` in `.env`

### Local MongoDB Connection

For local development:

```env
MONGODB_URI=mongodb://localhost:27017/agromarket
```

### Database Seeding

To populate sample data:

```bash
cd server
node seed.js
```

This creates:
- 2 test users (seller@agromarket.com, farmer@agromarket.com)
- 6 product categories
- 10 sample products

Test credentials: `password123`

---

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login with email/password
- `GET /api/auth/verify` - Verify JWT token

### Product Endpoints

- `GET /api/products` - Get all products with pagination
- `GET /api/products/:id` - Get single product details
- `POST /api/products` - Create new product (seller only)
- `PUT /api/products/:id` - Update product (owner only)
- `DELETE /api/products/:id` - Delete product (owner only)

### User Management

- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile
- `GET /api/users` - List all users (admin only)

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

---

## License

**Proprietary License - All Rights Reserved**

This software and all associated documentation are the exclusive property of **Seydith**. Unauthorized copying, distribution, modification, or use of this software is strictly prohibited.

For licensing inquiries or permissions, please contact the copyright holder.

---

_Platform developed and maintained by Seydith © 2026_
