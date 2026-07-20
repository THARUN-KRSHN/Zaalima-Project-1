import express from 'express';
import {
    initiateCheckout,
    createOrder,
    verifyPayment,
    getCustomerOrders,
    getCustomerOrderById,
    cancelCustomerOrder
} from '../controllers/checkoutController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Checkout flow
router.post('/checkout/initiate', protect, authorize('customer'), initiateCheckout);
router.post('/orders/create', protect, authorize('customer'), createOrder);
router.post('/payments/verify', protect, authorize('customer'), verifyPayment);

// Orders (customers can access own orders)
router.get('/orders', protect, authorize('customer'), getCustomerOrders);
router.get('/orders/:orderId', protect, authorize('customer'), getCustomerOrderById);
router.post('/orders/:orderId/cancel', protect, authorize('customer'), cancelCustomerOrder);

export default router;
