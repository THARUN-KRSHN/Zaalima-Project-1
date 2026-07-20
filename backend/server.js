import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import checkoutRoutes from './routes/checkout.js';
import vendorRoutes from './routes/vendor.js';
import analyticsRoutes from './routes/analytics.js';
import wishlistRoutes from './routes/wishlist.js';
import addressRoutes from './routes/address.js';
import profileRoutes from './routes/profile.js';
import categoryRoutes from './routes/categories.js';
import adminRoutes from './routes/admin.js';
import notificationRoutes from './routes/notifications.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5174'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, Postman, curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, true); // Allow all in development
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Zaalima Zmarket Multi-Tenant API Server is operational.',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        endpoints: {
            auth: '/api/auth or /api/v1/auth',
            products: '/api/v1/products',
            categories: '/api/v1/categories',
            cart: '/api/v1/cart',
            wishlist: '/api/v1/wishlist',
            addresses: '/api/v1/addresses',
            profile: '/api/v1/profile',
            orders: '/api/v1/orders',
            checkout: '/api/v1/checkout',
            vendor: '/api/v1/vendor',
            analytics: '/api/v1/analytics',
            admin: '/api/v1/admin',
            notifications: '/api/v1/notifications',
            upload: '/api/v1/upload'
        }
    });
});

app.get('/api/v1', (req, res) => {
    res.json({ success: true, message: 'Zmarket API v1', version: '1.0.0' });
});

// Auth routes (support both /api/auth and /api/v1/auth for compatibility)
app.use('/api/auth', authRoutes);
app.use('/api/v1/auth', authRoutes);

// Core customer routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/addresses', addressRoutes);
app.use('/api/v1/profile', profileRoutes);

// Checkout & orders routes (mounted at /api/v1 directly)
app.use('/api/v1', checkoutRoutes);

// Vendor routes
app.use('/api/v1/vendor', vendorRoutes);

// Analytics routes (vendor analytics)
app.use('/api/v1/analytics', analyticsRoutes);

// Admin routes
app.use('/api/v1/admin', adminRoutes);

// Notifications
app.use('/api/v1/notifications', notificationRoutes);

// File upload
app.use('/api/v1/upload', uploadRoutes);

// 404 handler
app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`API Endpoint Not Found - ${req.originalUrl}`);
    next(error);
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n🚀 Zmarket API Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`   Local: http://localhost:${PORT}`);
    console.log(`   Docs:  http://localhost:${PORT}/\n`);
});
