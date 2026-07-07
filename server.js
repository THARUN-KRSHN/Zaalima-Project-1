import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';


import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import checkoutRoutes from './routes/checkout.js';
import vendorRoutes from './routes/vendor.js';
import analyticsRoutes from './routes/analytics.js';


dotenv.config();


connectDB();

const app = express();


app.use(helmet());
app.use(cors({
    origin: '*', 
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Zaalima Zmarket Multi-Tenant API Server is operational.',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});


app.use('/api/auth', authRoutes);
app.use('/api/v1/auth', authRoutes); 
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);


app.use('/api/v1', checkoutRoutes);

app.use('/api/v1/vendor', vendorRoutes);
app.use('/api/v1/analytics', analyticsRoutes);


app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`API Endpoint Not Found - ${req.originalUrl}`);
    next(error);
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
