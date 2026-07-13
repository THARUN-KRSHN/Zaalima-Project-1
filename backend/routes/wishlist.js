import express from 'express';
import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    moveToCart
} from '../controllers/wishlistController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('customer'));

router.get('/', getWishlist);
router.post('/', addToWishlist);
router.delete('/:productId', removeFromWishlist);
router.post('/move-to-cart', moveToCart);

export default router;
