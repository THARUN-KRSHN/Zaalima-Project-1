import express from 'express';
import {
    getCart,
    addToCart,
    updateCart,
    removeFromCart
} from '../controllers/cartController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('customer')); 

router.get('/', getCart);
router.post('/items', addToCart);
router.put('/items/:itemId', updateCart);
router.delete('/items/:itemId', removeFromCart);

export default router;
