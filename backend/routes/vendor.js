import express from 'express';
import {
    getVendorDashboardSummary,
    getVendorOrdersLedger,
    updateVendorOrderStatus,
    getVendorProductsCatalog,
    createVendorProduct,
    updateVendorProduct,
    deleteVendorProduct,
    updateInventoryStock,
    getVendorProfile,
    updateVendorProfile,
    updateVendorPassword
} from '../controllers/vendorController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('vendor', 'superadmin', 'admin'));

// Dashboard
router.get('/dashboard', getVendorDashboardSummary);
router.get('/dashboard-summary', getVendorDashboardSummary); // alias

// Orders
router.get('/orders', getVendorOrdersLedger);
router.get('/orders-ledger', getVendorOrdersLedger); // alias
router.put('/orders/:orderId/status', updateVendorOrderStatus);

// Products CRUD
router.get('/products', getVendorProductsCatalog);
router.get('/products-catalog', getVendorProductsCatalog); // alias
router.post('/products', createVendorProduct);
router.put('/products/:productId', updateVendorProduct);
router.delete('/products/:productId', deleteVendorProduct);
router.put('/products/:productId/stock', updateInventoryStock);

// Inventory
router.get('/inventory', getVendorProductsCatalog);
router.put('/inventory/:productId', updateInventoryStock);

// Profile / Settings
router.get('/profile', getVendorProfile);
router.get('/settings', getVendorProfile); // alias
router.put('/profile', updateVendorProfile);
router.put('/settings', updateVendorProfile); // alias
router.put('/password', updateVendorPassword);

export default router;
