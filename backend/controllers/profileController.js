import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';


export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .populate('vendorStore');

        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        res.json({
            success: true,
            data: {
                id: user._id,
                _id: user._id,
                fullName: user.fullName,
                name: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                avatar: user.avatar,
                addresses: user.addresses,
                wishlist: user.wishlist,
                isVerified: user.isVerified,
                vendorStore: user.vendorStore || null,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        next(error);
    }
};


export const updateProfile = async (req, res, next) => {
    const { fullName, phone, avatar } = req.body;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        if (fullName !== undefined) {
            if (fullName.trim().length < 3) {
                throw new AppError('Full name must be at least 3 characters.', 400, 'INVALID_PARAMETERS', {
                    fullName: 'Full name must be at least 3 characters.'
                });
            }
            user.fullName = fullName.trim();
        }

        if (phone !== undefined) user.phone = phone;
        if (avatar !== undefined) user.avatar = avatar;

        await user.save();

        res.json({
            success: true,
            message: 'Profile updated successfully.',
            data: {
                id: user._id,
                fullName: user.fullName,
                name: user.fullName,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};


export const changePassword = async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const validationErrors = {};
        if (!currentPassword) validationErrors.currentPassword = 'Current password is required.';
        if (!newPassword || newPassword.length < 6) {
            validationErrors.newPassword = 'New password must be at least 6 characters.';
        }

        if (Object.keys(validationErrors).length > 0) {
            throw new AppError('Validation failed.', 400, 'INVALID_PARAMETERS', validationErrors);
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            throw new AppError('Current password is incorrect.', 400, 'INVALID_PARAMETERS', {
                currentPassword: 'Current password is incorrect.'
            });
        }

        user.password = newPassword;
        await user.save();

        res.json({
            success: true,
            message: 'Password updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};
