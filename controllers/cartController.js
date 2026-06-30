import Cart from '../models/Cart.js';
import Product from '../models/Product.js';


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
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404);
            throw new Error('Product not found.');
        }

        if (product.stock < Number(quantity)) {
            res.status(400);
            throw new Error(`Insufficient inventory stock. Only ${product.stock} items remaining.`);
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
                res.status(400);
                throw new Error(`Cannot add more items. Total requested quantity (${newQty}) exceeds stock.`);
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
        if (Number(quantity) < 1) {
            res.status(400);
            throw new Error('Quantity must be at least 1.');
        }

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            res.status(404);
            throw new Error('Cart not found.');
        }

        const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
        if (itemIndex === -1) {
            res.status(404);
            throw new Error('Cart item not found.');
        }

        
        const productId = cart.items[itemIndex].product;
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404);
            throw new Error('Product associated with this cart item no longer exists.');
        }

        if (product.stock < Number(quantity)) {
            res.status(400);
            throw new Error(`Insufficient inventory stock. Only ${product.stock} items remaining.`);
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
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            res.status(404);
            throw new Error('Cart not found.');
        }

        const itemIndex = cart.items.findIndex((item) => item._id.toString() === itemId);
        if (itemIndex === -1) {
            res.status(404);
            throw new Error('Cart item not found.');
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
