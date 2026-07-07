import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { AppError } from '../utils/AppError.js';
import mongoose from 'mongoose';


const formatCartResponse = (cart) => {
    if (!cart) return { items: [], subtotal: 0 };
    
    let subtotal = 0;
    const formattedItems = cart.items
        .filter(item => item.product) 
        .map(item => {
            const prod = item.product;
            const priceInRupees = Number((prod.price / 100).toFixed(2));
            const itemTotal = priceInRupees * item.quantity;
            subtotal += itemTotal;

            return {
                id: item._id.toString(),
                productId: prod._id.toString(),
                title: prod.title,
                brand: prod.brand,
                price: priceInRupees,
                quantity: item.quantity,
                image: prod.image,
                stock: prod.stock,
                total: Number(itemTotal.toFixed(2))
            };
        });

    return {
        items: formattedItems,
        subtotal: Number(subtotal.toFixed(2))
    };
};




export const getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        res.json({
            success: true,
            cart: formatCartResponse(cart)
        });
    } catch (error) {
        next(error);
    }
};




export const addToCart = async (req, res, next) => {
    const { productId, quantity = 1 } = req.body;

    try {
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            throw new AppError('Valid product ID is required.', 400, 'INVALID_PARAMETERS', {
                productId: 'Valid product identifier must be specified.'
            });
        }

        if (isNaN(quantity) || Number(quantity) < 1) {
            throw new AppError('Quantity must be a positive integer.', 400, 'INVALID_PARAMETERS', {
                quantity: 'Quantity must be at least 1.'
            });
        }

        const product = await Product.findById(productId);
        if (!product) {
            throw new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND');
        }

        if (product.stock < Number(quantity)) {
            throw new AppError(`Insufficient inventory stock. Only ${product.stock} items remaining.`, 400, 'INSUFFICIENT_STOCK', {
                quantity: `Only ${product.stock} items remaining.`
            });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            const newQty = cart.items[existingItemIndex].quantity + Number(quantity);
            if (product.stock < newQty) {
                throw new AppError(`Cannot add more items. Total requested quantity (${newQty}) exceeds stock.`, 400, 'INSUFFICIENT_STOCK', {
                    quantity: `Cannot add more items. Total requested quantity (${newQty}) exceeds stock.`
                });
            }
            cart.items[existingItemIndex].quantity = newQty;
        } else {
            cart.items.push({ product: productId, quantity: Number(quantity) });
        }

        await cart.save();
        
        const populatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.json({
            success: true,
            cart: formatCartResponse(populatedCart)
        });
    } catch (error) {
        next(error);
    }
};




export const updateCart = async (req, res, next) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    try {
        if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
            throw new AppError('Valid cart item ID is required.', 400, 'INVALID_PARAMETERS');
        }

        if (quantity === undefined || isNaN(quantity) || Number(quantity) < 1) {
            throw new AppError('Quantity must be at least 1.', 400, 'INVALID_PARAMETERS', {
                quantity: 'Quantity must be at least 1.'
            });
        }

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            throw new AppError('Cart not found.', 404, 'CART_NOT_FOUND');
        }

        const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
        if (itemIndex === -1) {
            throw new AppError('Cart item not found.', 404, 'ITEM_NOT_FOUND');
        }

        const productId = cart.items[itemIndex].product;
        const product = await Product.findById(productId);
        if (!product) {
            throw new AppError('Product associated with this cart item no longer exists.', 404, 'PRODUCT_NOT_FOUND');
        }

        if (product.stock < Number(quantity)) {
            throw new AppError(`Insufficient inventory stock. Only ${product.stock} items remaining.`, 400, 'INSUFFICIENT_STOCK', {
                quantity: `Only ${product.stock} items remaining.`
            });
        }

        cart.items[itemIndex].quantity = Number(quantity);
        await cart.save();

        const populatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.json({
            success: true,
            cart: formatCartResponse(populatedCart)
        });
    } catch (error) {
        next(error);
    }
};




export const removeFromCart = async (req, res, next) => {
    const { itemId } = req.params;

    try {
        if (!itemId || !mongoose.Types.ObjectId.isValid(itemId)) {
            throw new AppError('Valid cart item ID is required.', 400, 'INVALID_PARAMETERS');
        }

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            throw new AppError('Cart not found.', 404, 'CART_NOT_FOUND');
        }

        const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
        if (itemIndex === -1) {
            throw new AppError('Cart item not found.', 404, 'ITEM_NOT_FOUND');
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();

        const populatedCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.json({
            success: true,
            cart: formatCartResponse(populatedCart)
        });
    } catch (error) {
        next(error);
    }
};
