import User from '../models/User.js';
import Cart from '../models/Cart.js';
import { AppError } from '../utils/AppError.js';
import mongoose from 'mongoose';


export const getWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: 'wishlist',
                select: 'title brand category image price stock rating reviewCount tag status vendor'
            });

        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        const wishlistItems = (user.wishlist || []).map(product => ({
            productId: product._id.toString(),
            id: product._id.toString(),
            title: product.title,
            brand: product.brand,
            category: product.category,
            image: product.image,
            price: Number((product.price / 100).toFixed(2)),
            stock: product.stock,
            rating: product.rating,
            reviewCount: product.reviewCount,
            tag: product.tag,
            status: product.status
        }));

        res.json({
            success: true,
            data: wishlistItems,
            wishlist: wishlistItems
        });
    } catch (error) {
        next(error);
    }
};


export const addToWishlist = async (req, res, next) => {
    const { productId } = req.body;

    try {
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            throw new AppError('Valid product ID is required.', 400, 'INVALID_PARAMETERS', {
                productId: 'Valid product identifier must be specified.'
            });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        const alreadyInWishlist = user.wishlist.some(
            (id) => id.toString() === productId
        );

        if (!alreadyInWishlist) {
            user.wishlist.push(productId);
            await user.save();
        }

        res.json({
            success: true,
            message: alreadyInWishlist ? 'Product already in wishlist.' : 'Product added to wishlist.',
            wishlistCount: user.wishlist.length
        });
    } catch (error) {
        next(error);
    }
};


export const removeFromWishlist = async (req, res, next) => {
    const { productId } = req.params;

    try {
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            throw new AppError('Valid product ID is required.', 400, 'INVALID_PARAMETERS');
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        user.wishlist = user.wishlist.filter(
            (id) => id.toString() !== productId
        );
        await user.save();

        res.json({
            success: true,
            message: 'Product removed from wishlist.',
            wishlistCount: user.wishlist.length
        });
    } catch (error) {
        next(error);
    }
};


export const moveToCart = async (req, res, next) => {
    const { productId } = req.body;

    try {
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            throw new AppError('Valid product ID is required.', 400, 'INVALID_PARAMETERS');
        }

        // Remove from wishlist
        const user = await User.findById(req.user._id);
        user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
        await user.save();

        // Add to cart
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += 1;
        } else {
            cart.items.push({ product: productId, quantity: 1 });
        }

        await cart.save();

        res.json({
            success: true,
            message: 'Product moved to cart successfully.'
        });
    } catch (error) {
        next(error);
    }
};
