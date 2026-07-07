import express from 'express';
import {
    getVendorDashboardSummary,
    getVendorOrdersLedger,
    getVendorProductsCatalog,
    updateVendorOrderStatus
} from '../controllers/vendorController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('vendor', 'superadmin')); 

router.get('/dashboard-summary', getVendorDashboardSummary);
router.get('/orders-ledger', getVendorOrdersLedger);
router.get('/products-catalog', getVendorProductsCatalog);
router.put('/orders/:orderId/status', updateVendorOrderStatus);

export default router;
