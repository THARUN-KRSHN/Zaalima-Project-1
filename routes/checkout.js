import express from 'express';
import {
    initiateCheckout,
    createOrder,
    verifyPayment,
    getCustomerOrders
} from '../controllers/checkoutController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkout/initiate', protect, authorize('customer'), initiateCheckout);
router.post('/orders/create', protect, authorize('customer'), createOrder);
router.post('/payments/verify', protect, authorize('customer'), verifyPayment);
router.get('/orders', protect, authorize('customer'), getCustomerOrders);

export default router;
