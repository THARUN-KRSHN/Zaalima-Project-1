import express from 'express';
import {
    getProducts,
    getProductById,
    getSimilarProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();


router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/:id/similar', getSimilarProducts);


router.post('/', protect, authorize('vendor', 'superadmin'), createProduct);
router.put('/:id', protect, authorize('vendor', 'superadmin'), updateProduct);
router.delete('/:id', protect, authorize('vendor', 'superadmin'), deleteProduct);

export default router;
