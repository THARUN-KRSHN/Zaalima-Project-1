# ZMarket – Multi-Tenant E-Commerce SaaS Platform

Welcome to **ZMarket**, a multi-tenant e-commerce Software-as-a-Service (SaaS) marketplace that allows multiple independent vendors to host their online storefronts, manage inventories, analyze sales, and process transactions under a single unified platform.

---

## 1. Project Overview
* **Project Name**: ZMarket
* **Organization**: Zaalima Development
* **Architecture**: Decoupled Client–Server Architecture (RESTful APIs)
* **Live Storefront**: [https://zmarket-demo.vercel.app](https://zmarket-demo.vercel.app)
* **Live API Engine**: [https://zaalima-project-1.onrender.com](https://zaalima-project-1.onrender.com)
* **Frontend**: React 19 + Vite + Tailwind CSS + Redux Toolkit
* **Backend**: Node.js + Express.js (ES Modules) + Mongoose (MongoDB)
* **Authentication**: JSON Web Tokens (JWT) & HTTP-only Cookies
* **Media Assets Storage**: Cloudinary CDN Integration
* **Payment Gateway**: Razorpay API Integration

---

## 2. Business Logic & Tenancy Model
ZMarket consolidates multi-vendor operations into a single platform:
* **For Customers**: A single marketplace with access to multiple stores, using a centralized shopping cart and order history.
* **For Vendors**: Dedicated admin storefronts, inventory management panels, order fulfillment flows, and store-specific analytics.
* **For Admins**: Complete moderator overview of the platform, including vendor vetting, user role modifications, and global transaction audits.

---

## 3. User Roles & Permission Matrix

| Action | Guest | Customer | Vendor | Admin / SuperAdmin |
| :--- | :---: | :---: | :---: | :---: |
| Browse & Search Products | ✅ | ✅ | ✅ | ✅ |
| View Product Details | ✅ | ✅ | ✅ | ✅ |
| Add to Cart / Wishlist | ❌ | ✅ | ❌ | ❌ |
| Checkout & Payments | ❌ | ✅ | ❌ | ❌ |
| Manage Personal Profile | ❌ | ✅ | ✅ | ✅ |
| Vendor Dashboard (Sales, CRUD) | ❌ | ❌ | ✅ | ❌ |
| Platform Control (Admin Board) | ❌ | ❌ | ❌ | ✅ |

---

## 4. Directory Structures

### Frontend Layout (`frontend/`)
```
frontend/
├── src/
│   ├── assets/       # Media files and styles
│   ├── components/   # Atomic UI elements
│   │   ├── common/   # Layout elements (Navbar, Footer, Breadcrumbs, Loader, Pagination)
│   │   ├── product/  # ProductCard, SearchBar, CategoryFilter, SimilarProducts, etc.
│   │   ├── cart/     # Cart items lists & summaries
│   │   ├── checkout/ # Shipping forms & payment options
│   │   └── dashboard/# Charts & analytics display nodes
│   ├── data/         # Mock fallback data (products, cartData, checkoutData)
│   ├── hooks/        # Reusable custom React hooks
│   ├── layouts/      # Shell templates (e.g. AuthLayout)
│   ├── pages/        # Route page views (public, customer, vendor, admin folders)
│   ├── redux/        # Auth state slices & Redux store definitions
│   ├── routes/       # Protected route managers
│   ├── services/     # API request utilities (apiClient, productService, authService)
│   └── utils/        # Global formatting helpers
└── package.json
```

### Backend Layout (`backend/`)
```
backend/
├── config/           # Database connections and Cloudinary credentials
├── controllers/      # Route request validation & business logic operations
├── middleware/       # JWT parsing, auth guards, file uploads, error handlers
├── models/           # Mongoose schemas (User, Product, Store, Cart, Order, etc.)
├── routes/           # REST endpoints mapping controllers
├── scripts/          # Seed scripts and mock databases populators
├── uploads/          # Local static upload temporary caches
└── server.js         # Express main entry point
```

---

## 5. Database Schema Specifications

### User (`models/User.js`)
* `fullName` (String, Required)
* `email` (String, Required, Unique)
* `password` (String, Bcrypt hashed, Required)
* `role` (Enum: `['customer', 'vendor', 'admin', 'superadmin']`, Default: `'customer'`)
* `phone` (String)
* `addresses` (Array of Address Schema: name, phone, line1, line2, city, state, pincode, isDefault)
* `wishlist` (Array of ObjectIds referencing Products)

### Store (`models/Store.js`)
* `storeName` (String, Required)
* `owner` (ObjectId referencing User, Unique)
* `description` (String)
* `gstNumber` (String)
* `storeAddress` (String)
* `isApproved` (Boolean, Default: `false`)
* `status` (Enum: `['active', 'suspended']`, Default: `'active'`)

### Product (`models/Product.js`)
* `title` (String, Required)
* `brand` (String, Required)
* `category` (String, Required)
* `price` (Number, stored in paise/cents, Required)
* `discount` (Number, percentage)
* `stock` (Number, default 0)
* `image` (String, main image URL, Required)
* `images` (Array of Strings)
* `specifications` (Map of Strings)
* `vendor` (ObjectId referencing User/Store, Required)
* `status` (Enum: `['ACTIVE', 'LOW_STOCK', 'OUT_OF_STOCK']`, Default: `'ACTIVE'`)

---

## 6. Routing Map

### Frontend Pages
* **Public**: `/`, `/products`, `/products/:id`, `/about`, `/contact`, `/login`, `/register`, `/forgot-password`
* **Customer**: `/cart`, `/checkout`, `/orders`, `/orders/:id`, `/profile`, `/profile/addresses`, `/wishlist`
* **Vendor**: `/vendor/dashboard`, `/vendor/products`, `/vendor/products/add`, `/vendor/orders`, `/vendor/inventory`, `/vendor/analytics`, `/vendor/settings`
* **Admin**: `/admin/dashboard`, `/admin/users`, `/admin/vendors`, `/admin/products`, `/admin/orders`, `/admin/analytics`, `/admin/settings`

### Express API Endpoints
All API calls are served under the `/api/v1` namespace:
* **Auth**: `/auth/login`, `/auth/register/customer`, `/auth/register/vendor`, `/auth/me`, `/auth/logout`
* **Catalog**: `/products` (GET, POST), `/products/:id` (GET, PUT, DELETE), `/categories` (GET)
* **Cart**: `/cart` (GET, DELETE), `/cart/items` (POST), `/cart/items/:itemId` (PUT, DELETE)
* **Checkout**: `/checkout/initiate` (POST), `/orders/create` (POST), `/payments/verify` (POST)
* **Vendor**: `/vendor/dashboard` (GET), `/vendor/products` (GET), `/vendor/orders` (GET)
* **Admin**: `/admin/users` (GET, PUT), `/admin/vendors` (GET, PUT)

---

## 7. Setup & Installation

### Prerequisities
* Node.js (v18+)
* MongoDB (Atlas or local instance)

### 1. Backend Configuration
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables `.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_uri
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=30d
   FRONTEND_URL=http://localhost:5173
   ```
4. Run the DB seed script to populate products and accounts:
   ```bash
   npm run seed
   ```
5. Launch the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Configuration
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
