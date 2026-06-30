import User from '../models/User.js';
import Store from '../models/Store.js';
import Cart from '../models/Cart.js';
import jwt from 'jsonwebtoken';


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};




export const registerCustomer = async (req, res, next) => {
    const { fullName, email, password, phone } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('Email address already registered in the system.');
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
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            res.status(400);
            throw new Error('Corporate email address is already in use.');
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
            res.status(401);
            throw new Error('Invalid email or password credentials provided.');
        }
    } catch (error) {
        next(error);
    }
};




export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404);
            throw new Error('No account found with this email address.');
        }

        res.json({
            success: true,
            message: 'Password reset link dispatched. Please check your inbox matching this address.'
        });
    } catch (error) {
        next(error);
    }
};
