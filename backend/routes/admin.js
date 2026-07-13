import express from 'express';
import {
    getAdminDashboard,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getAllVendors,
    approveVendor,
    rejectVendor,
    updateVendorStatus,
    getAllProductsAdmin,
    deleteProductAdmin,
    featureProduct,
    getAllOrdersAdmin,
    getOrderByIdAdmin,
    updateOrderAdmin,
    getAdminAnalytics
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All admin routes are protected + admin only
router.use(protect);
router.use(authorize('superadmin', 'admin'));

// Dashboard
router.get('/dashboard', getAdminDashboard);

// User management
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Vendor management
router.get('/vendors', getAllVendors);
router.put('/vendors/:id/approve', approveVendor);
router.put('/vendors/:id/reject', rejectVendor);
router.put('/vendors/:id/status', updateVendorStatus);

// Product management
router.get('/products', getAllProductsAdmin);
router.delete('/products/:id', deleteProductAdmin);
router.put('/products/:id/feature', featureProduct);

// Order management
router.get('/orders', getAllOrdersAdmin);
router.get('/orders/:orderId', getOrderByIdAdmin);
router.put('/orders/:orderId', updateOrderAdmin);

// Analytics
router.get('/analytics', getAdminAnalytics);

export default router;
