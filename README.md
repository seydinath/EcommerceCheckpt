# 🌾 AgroMarket - Agriculture E-Commerce Platform

A modern, feature-rich agricultural e-commerce platform connecting farmers, sellers, and buyers. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. Platform pour connecter les agriculteurs, vendeurs et acheteurs dans l'écosystème agricole.

**Propriétaire:** Seydith  
**Tous droits réservés © 2026 Seydith**

## Features ✨

- **Role-Based Access**: Buyers, Sellers, and Farmers with distinct features
- **Product Requests System**: Buyers can request specific quantities and products from sellers/farmers
- **Agricultural UI Design**: Earth tones, natural gradients, and sustainable aesthetics
- **Multi-language Support**: Full localization in English, French, and Arabic (`i18n`)
- **Performance Optimized**: Lazy loading for pages and images
- **Notification System**: Real-time updates for product requests and seller responses
- **Seller/Farmer Dashboard**: Manage products and incoming requests
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop

## Tech Stack 🛠️

### Frontend

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui, Mantine
- **State Management**: React Context API (Auth, Cart, Wishlist)
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM (with Lazy Loading)
- **Internationalization**: react-i18next
- **Icons**: Lucide React

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer

### Data Models (Agricultural)

- **User**: Three roles - Buyer, Seller, Farmer
- **Product**: Agricultural products with categories (vegetables, fruits, grains, dairy, meat, herbs, seeds, equipment)
- **Request**: Product request system for buyers to request from sellers/farmers

## Project Structure 📂

- `/src` — Frontend application source code
  - `/pages` — Lazy-loaded route components
  - `/components` — Reusable UI components
  - `/context` — Global state providers
  - `/lib` — Utilities and API configuration
  - `/locales` — Translation files (EN, FR, AR)
- `/server` — Express API backend
- `/public` — Static assets

## Prerequisites

- Node.js 18+ and npm
- MongoDB connection string

## Setup & Installation 🚀

1. **Clone the repository**

   ```sh
   git clone https://github.com/ELMACHHOUNE/buy-brisk-boutique.git
   cd buy-brisk-boutique
   ```

2. **Install Frontend Dependencies**

   ```sh
   npm install
   ```

3. **Install Backend Dependencies**

   ```sh
   cd server
   npm install
   ```

4. **Environment Configuration**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

   Create a `.env` file in the `server` directory:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=http://localhost:8080
   ```

## Running the Application ▶️

**Frontend** (from root):

```sh
npm run dev
```

**Backend** (from `/server`):

```sh
npm run dev
```

## License 📄

**Proprietary License - All Rights Reserved**

This software and all associated documentation are the exclusive property of **Seydith**. Unauthorized copying, distribution, modification, or use of this software is strictly prohibited.

For licensing inquiries or permissions, please contact the copyright holder.

---

_Platform developed and maintained by Seydith © 2026_
