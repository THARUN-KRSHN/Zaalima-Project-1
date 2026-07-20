import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import mongoose from 'mongoose';


export const getAddresses = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('addresses');
        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        res.json({
            success: true,
            data: user.addresses || [],
            addresses: user.addresses || []
        });
    } catch (error) {
        next(error);
    }
};


export const addAddress = async (req, res, next) => {
    const { name, phone, addressLine1, addressLine2, city, state, pincode, country, isDefault } = req.body;

    try {
        const validationErrors = {};
        if (!name || !name.trim()) validationErrors.name = 'Name is required.';
        if (!phone || !/^[6-9]\d{9}$/.test(phone)) validationErrors.phone = 'Valid 10-digit phone number is required.';
        if (!addressLine1 || !addressLine1.trim()) validationErrors.addressLine1 = 'Address Line 1 is required.';
        if (!city || !city.trim()) validationErrors.city = 'City is required.';
        if (!state || !state.trim()) validationErrors.state = 'State is required.';
        if (!pincode || !/^\d{6}$/.test(pincode)) validationErrors.pincode = 'Valid 6-digit pincode is required.';

        if (Object.keys(validationErrors).length > 0) {
            throw new AppError('Address validation failed.', 400, 'INVALID_PARAMETERS', validationErrors);
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        // If new address is default, clear others
        if (isDefault) {
            user.addresses.forEach(addr => { addr.isDefault = false; });
        }

        // If first address, make it default
        const makeDefault = isDefault || user.addresses.length === 0;

        user.addresses.push({
            name,
            phone,
            addressLine1,
            addressLine2,
            city,
            state,
            pincode,
            country: country || 'India',
            isDefault: makeDefault
        });

        await user.save();

        const newAddress = user.addresses[user.addresses.length - 1];

        res.status(201).json({
            success: true,
            message: 'Address added successfully.',
            data: newAddress,
            address: newAddress
        });
    } catch (error) {
        next(error);
    }
};


export const updateAddress = async (req, res, next) => {
    const { addressId } = req.params;
    const { name, phone, addressLine1, addressLine2, city, state, pincode, country, isDefault } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            throw new AppError('Invalid address ID.', 400, 'INVALID_PARAMETERS');
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        const address = user.addresses.id(addressId);
        if (!address) {
            throw new AppError('Address not found.', 404, 'ADDRESS_NOT_FOUND');
        }

        if (isDefault) {
            user.addresses.forEach(addr => { addr.isDefault = false; });
        }

        if (name !== undefined) address.name = name;
        if (phone !== undefined) address.phone = phone;
        if (addressLine1 !== undefined) address.addressLine1 = addressLine1;
        if (addressLine2 !== undefined) address.addressLine2 = addressLine2;
        if (city !== undefined) address.city = city;
        if (state !== undefined) address.state = state;
        if (pincode !== undefined) address.pincode = pincode;
        if (country !== undefined) address.country = country;
        if (isDefault !== undefined) address.isDefault = isDefault;

        await user.save();

        res.json({
            success: true,
            message: 'Address updated successfully.',
            data: address,
            address
        });
    } catch (error) {
        next(error);
    }
};


export const deleteAddress = async (req, res, next) => {
    const { addressId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(addressId)) {
            throw new AppError('Invalid address ID.', 400, 'INVALID_PARAMETERS');
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        const address = user.addresses.id(addressId);
        if (!address) {
            throw new AppError('Address not found.', 404, 'ADDRESS_NOT_FOUND');
        }

        user.addresses.pull(addressId);
        await user.save();

        res.json({
            success: true,
            message: 'Address deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};
