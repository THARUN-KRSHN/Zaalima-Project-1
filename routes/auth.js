import express from 'express';
import {
    registerCustomer,
    registerVendor,
    login,
    forgotPassword
} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/register/customer', registerCustomer);
router.post('/register/vendor', registerVendor);
router.post('/forgot-password', forgotPassword);

export default router;
