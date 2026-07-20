import User from '../models/User.js';
import Store from '../models/Store.js';
import Cart from '../models/Cart.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { AppError } from '../utils/AppError.js';


const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '30d'
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

        const token = generateToken(user._id, user.role);

        res.status(201).json({
            success: true,
            message: 'Registration successful.',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                name: user.fullName,
                email: user.email,
                role: user.role,
                phone: user.phone,
                avatar: user.avatar
            }
        });
    } catch (error) {
        next(error);
    }
};


export const registerVendor = async (req, res, next) => {
    const { storeName, ownerName, email, gstNumber, storeAddress, password, phone } = req.body;

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
            phone,
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

        const token = generateToken(user._id, user.role);

        res.status(201).json({
            success: true,
            message: 'Vendor registration successful. Awaiting approval.',
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                name: user.fullName,
                email: user.email,
                role: user.role,
                vendorStore: store._id
            }
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

        const user = await User.findOne({ email }).populate('vendorStore');

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id, user.role);

            res.json({
                success: true,
                message: 'Login successful.',
                token,
                user: {
                    id: user._id,
                    _id: user._id,
                    fullName: user.fullName,
                    name: user.fullName,
                    email: user.email,
                    role: user.role,
                    phone: user.phone,
                    avatar: user.avatar,
                    vendorStore: user.vendorStore || null
                }
            });
        } else {
            throw new AppError('Invalid email or password credentials provided.', 401, 'INVALID_CREDENTIALS');
        }
    } catch (error) {
        next(error);
    }
};


export const logout = async (req, res) => {
    // JWT is stateless — client should discard the token.
    res.json({
        success: true,
        message: 'Logged out successfully.'
    });
};


export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .populate('vendorStore');

        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                _id: user._id,
                fullName: user.fullName,
                name: user.fullName,
                email: user.email,
                role: user.role,
                phone: user.phone,
                avatar: user.avatar,
                wishlist: user.wishlist,
                addresses: user.addresses,
                isVerified: user.isVerified,
                vendorStore: user.vendorStore || null,
                createdAt: user.createdAt
            }
        });
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
            // Don't reveal if user exists — return success anyway for security
            return res.json({
                success: true,
                message: 'If that email is registered, a password reset link has been sent.'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save({ validateBeforeSave: false });

        res.json({
            success: true,
            message: 'If that email is registered, a password reset link has been sent.',
            // In development, expose token for testing
            ...(process.env.NODE_ENV === 'development' && { resetToken })
        });
    } catch (error) {
        next(error);
    }
};


export const resetPassword = async (req, res, next) => {
    const { token, password } = req.body;

    try {
        if (!token) {
            throw new AppError('Reset token is required.', 400, 'INVALID_PARAMETERS');
        }
        if (!password || password.length < 6) {
            throw new AppError('Password must be at least 6 characters.', 400, 'INVALID_PARAMETERS', {
                password: 'Password must be at least 6 characters.'
            });
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: new Date() }
        });

        if (!user) {
            throw new AppError('Invalid or expired reset token.', 400, 'INVALID_TOKEN');
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({
            success: true,
            message: 'Password reset successful. You can now log in with your new password.'
        });
    } catch (error) {
        next(error);
    }
};
