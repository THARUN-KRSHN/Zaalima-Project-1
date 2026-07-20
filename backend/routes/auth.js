import express from 'express';
import {
    registerCustomer,
    registerVendor,
    login,
    logout,
    getMe,
    forgotPassword,
    resetPassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/register/customer', registerCustomer);
router.post('/register/vendor', registerVendor);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

export default router;
