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
router.post('/items', addToCart);       // Frontend: POST /cart/items
router.post('/add', addToCart);         // Alias: POST /cart/add
router.put('/items/:itemId', updateCart);
router.delete('/items/:itemId', removeFromCart);
router.delete('/clear', async (req, res, next) => {
    try {
        const { default: Cart } = await import('../models/Cart.js');
        await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } });
        res.json({ success: true, message: 'Cart cleared successfully.' });
    } catch (error) {
        next(error);
    }
});

export default router;

