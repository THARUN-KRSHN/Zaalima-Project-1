import User from '../models/User.js';
import Store from '../models/Store.js';
import Cart from '../models/Cart.js';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};




export const registerCustomer = async (req, res, next) => {
    const { fullName, email, password, phone } = req.body;

    try {
        const validationErrors = {};
        if (!fullName || fullName.trim().length < 3) {
            validationErrors.fullName = 'Full name is required (minimum 3 characters).';
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Valid email address is required.';
        }
        if (!password || password.length < 6) {
            validationErrors.password = 'Password is required (minimum 6 characters).';
        }
        if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone) && !/^[6-9]\d{9}$/.test(phone)) {
            validationErrors.phone = 'Valid phone number format is required.';
        }

        if (Object.keys(validationErrors).length > 0) {
            throw new AppError('Validation failed.', 400, 'INVALID_PARAMETERS', validationErrors);
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new AppError('Email address already registered in the system.', 400, 'EMAIL_ALREADY_REGISTERED', {
                email: 'Email address is already in use.'
            });
        }

        const user = await User.create({
            fullName,
            email,
            password,
            phone,
            role: 'customer'
        });

        
        await Cart.create({ user: user._id, items: [] });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                phone: user.phone
            },
            token
        });
    } catch (error) {
        next(error);
    }
};




export const registerVendor = async (req, res, next) => {
    const { storeName, ownerName, email, gstNumber, storeAddress, password } = req.body;

    try {
        const validationErrors = {};
        if (!storeName || !storeName.trim()) {
            validationErrors.storeName = 'Store name is required.';
        }
        if (!ownerName || ownerName.trim().length < 3) {
            validationErrors.ownerName = 'Owner name is required (minimum 3 characters).';
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Valid corporate email address is required.';
        }
        if (!storeAddress || !storeAddress.trim()) {
            validationErrors.storeAddress = 'Store address is required.';
        }
        if (!password || password.length < 6) {
            validationErrors.password = 'Password is required (minimum 6 characters).';
        }
        if (gstNumber && !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/.test(gstNumber.toUpperCase())) {
            
            
        }

        if (Object.keys(validationErrors).length > 0) {
            throw new AppError('Validation failed.', 400, 'INVALID_PARAMETERS', validationErrors);
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            throw new AppError('Corporate email address is already in use.', 400, 'EMAIL_ALREADY_REGISTERED', {
                email: 'Email address is already in use.'
            });
        }

        const user = new User({
            fullName: ownerName,
            email,
            password,
            role: 'vendor'
        });

        const store = await Store.create({
            storeName,
            ownerName,
            email,
            gstNumber,
            storeAddress,
            owner: user._id
        });

        user.vendorStore = store._id;
        await user.save();

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                vendorStore: store._id
            },
            token
        });
    } catch (error) {
        next(error);
    }
};




export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validationErrors = {};
        if (!email) validationErrors.email = 'Email address is required.';
        if (!password) validationErrors.password = 'Password is required.';

        if (Object.keys(validationErrors).length > 0) {
            throw new AppError('Validation failed.', 400, 'INVALID_PARAMETERS', validationErrors);
        }

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            res.json({
                success: true,
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    vendorStore: user.vendorStore || null
                },
                token
            });
        } else {
            throw new AppError('Invalid email or password credentials provided.', 401, 'INVALID_CREDENTIALS');
        }
    } catch (error) {
        next(error);
    }
};




export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new AppError('Valid email address is required.', 400, 'INVALID_PARAMETERS', {
                email: 'Valid email address is required.'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError('No account found with this email address.', 404, 'USER_NOT_FOUND', {
                email: 'No account registered with this email address.'
            });
        }

        res.json({
            success: true,
            message: 'Password reset link dispatched. Please check your inbox matching this address.'
        });
    } catch (error) {
        next(error);
    }
};
