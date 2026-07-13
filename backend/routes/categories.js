import express from 'express';
import { getCategories, getCategoriesWithCount } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/with-count', getCategoriesWithCount);

export default router;
