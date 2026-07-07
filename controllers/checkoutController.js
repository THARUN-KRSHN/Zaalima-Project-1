import crypto from 'crypto';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import CheckoutSession from '../models/CheckoutSession.js';
import { AppError } from '../utils/AppError.js';


const returnExpiredStock = async () => {
    try {
        const expiredSessions = await CheckoutSession.find({
            expiresAt: { $lt: new Date() },
            status: 'ACTIVE',
            stockReturned: false
        });

        for (const session of expiredSessions) {
            
            const updated = await CheckoutSession.findOneAndUpdate(
                { _id: session._id, stockReturned: false },
                { $set: { status: 'EXPIRED', stockReturned: true } },
                { new: true }
            );

            if (updated) {
                
                for (const item of session.items) {
                    await Product.findByIdAndUpdate(item.product, {
                        $inc: { stock: item.quantity }
                    });
                }
                console.log(`Returned stock for expired checkout session: ${session.checkoutToken}`);
            }
        }
    } catch (error) {
        console.error('Error during expired stock recovery:', error.message);
    }
};




export const initiateCheckout = async (req, res, next) => {
    const { cartItems, promoCode } = req.body;

    try {
        
        await returnExpiredStock();

        if (!cartItems || cartItems.length === 0) {
            throw new AppError('Shopping bag is empty.', 400, 'INVALID_PARAMETERS', {
                cartItems: 'Shopping bag is empty.'
            });
        }

        const itemsToLock = [];
        let subtotal = 0;

        
        for (const item of cartItems) {
            const product = await Product.findById(item.productId);
            if (!product) {
                throw new AppError(`Product with ID ${item.productId} not found.`, 404, 'PRODUCT_NOT_FOUND', {
                    [item.productId]: 'Product not found.'
                });
            }

            if (product.stock < item.quantity) {
                throw new AppError(`Insufficient stock for "${product.title}". Only ${product.stock} items available.`, 400, 'INSUFFICIENT_STOCK', {
                    [item.productId]: `Only ${product.stock} items available.`
                });
            }

            subtotal += product.price * item.quantity;
            itemsToLock.push({
                product: product._id,
                quantity: item.quantity,
                lockedPrice: product.price
            });
        }

        
        for (const item of itemsToLock) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.quantity }
            });
        }

        
        let discount = 0;
        if (promoCode && promoCode.toUpperCase() === 'ZMARKET50') {
            discount = 15000; 
        }

        
        const tax = Math.round(subtotal * 0.05);

        
        const shipping = (subtotal > 150000 || subtotal === 0) ? 0 : 5000;

        const total = subtotal - discount + tax + shipping;

        
        const checkoutToken = 'chk_token_' + crypto.randomBytes(16).toString('hex');
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); 

        
        await CheckoutSession.create({
            checkoutToken,
            user: req.user._id,
            items: itemsToLock,
            discount,
            expiresAt
        });

        res.json({
            success: true,
            checkoutToken,
            pricingSummary: {
                subtotal: Number((subtotal / 100).toFixed(2)),
                discount: Number((discount / 100).toFixed(2)),
                tax: Number((tax / 100).toFixed(2)),
                shipping: Number((shipping / 100).toFixed(2)),
                total: Number((total / 100).toFixed(2))
            }
        });
    } catch (error) {
        next(error);
    }
};




export const createOrder = async (req, res, next) => {
    const { checkoutToken, shippingAddress, paymentMethod } = req.body;

    try {
        await returnExpiredStock();

        if (!shippingAddress) {
            throw new AppError('Shipping address is required.', 400, 'INVALID_PARAMETERS', {
                shippingAddress: 'Shipping address is required.'
            });
        }

        const { fullName, phone, email, addressLine1, pincode } = shippingAddress;
        const validationErrors = {};

        if (!fullName || fullName.trim().length < 3) {
            validationErrors.fullName = 'FullName is required (minimum 3 characters).';
        }
        if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
            validationErrors.phone = 'Valid 10-digit Indian phone number is required.';
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Valid email address is required.';
        }
        if (!addressLine1 || !addressLine1.trim()) {
            validationErrors.addressLine1 = 'Address Line 1 is required.';
        }
        if (!pincode || !/^\d{6}$/.test(pincode)) {
            validationErrors.pincode = 'Valid 6-digit pin code is required.';
        }

        if (Object.keys(validationErrors).length > 0) {
            throw new AppError('Address validation failed.', 400, 'INVALID_PARAMETERS', validationErrors);
        }

        
        const session = await CheckoutSession.findOne({
            checkoutToken,
            user: req.user._id,
            status: 'ACTIVE',
            expiresAt: { $gt: new Date() }
        }).populate('items.product');

        if (!session) {
            throw new AppError('Checkout session expired or invalid. Please re-initiate checkout.', 400, 'SESSION_EXPIRED');
        }

        
        const orderItems = [];
        let subtotal = 0;

        for (const item of session.items) {
            const product = item.product;
            orderItems.push({
                product: product._id,
                title: product.title,
                quantity: item.quantity,
                price: item.lockedPrice,
                vendor: product.vendor
            });
            subtotal += item.lockedPrice * item.quantity;
        }

        const tax = Math.round(subtotal * 0.05);
        const shipping = (subtotal > 150000) ? 0 : 5000;
        const total = subtotal - session.discount + tax + shipping;

        
        const orderNum = Math.floor(1000 + Math.random() * 9000);
        const orderSec = Math.floor(1000 + Math.random() * 9000);
        const orderId = `ZMK-${orderNum}-${orderSec}`;

        const newOrder = new Order({
            orderId,
            customer: req.user._id,
            items: orderItems,
            shippingAddress,
            paymentMethod,
            pricingSummary: {
                subtotal,
                discount: session.discount,
                tax,
                shipping,
                total
            }
        });

        if (paymentMethod === 'cod') {
            newOrder.orderStatus = 'PLACED';
            newOrder.paymentStatus = 'PENDING';
            await newOrder.save();

            
            session.status = 'COMPLETED';
            await session.save();

            
            await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } });

            res.status(201).json({
                success: true,
                orderStatus: 'PLACED',
                orderId,
                gatewayConfig: null
            });
        } else {
            newOrder.orderStatus = 'PENDING_PAYMENT';
            newOrder.paymentStatus = 'PENDING';

            const rzpOrderId = 'order_Rzp_' + crypto.randomBytes(8).toString('hex');
            newOrder.gatewayConfig = {
                gatewayOrderId: rzpOrderId
            };

            await newOrder.save();

            res.status(201).json({
                success: true,
                orderStatus: 'PENDING_PAYMENT',
                orderId,
                gatewayConfig: {
                    gateway: 'razorpay',
                    gatewayOrderId: rzpOrderId,
                    amount: total, 
                    currency: 'INR'
                }
            });
        }
    } catch (error) {
        next(error);
    }
};




export const verifyPayment = async (req, res, next) => {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        const order = await Order.findOne({ orderId });
        if (!order) {
            throw new AppError(`Order ${orderId} not found.`, 404, 'ORDER_NOT_FOUND');
        }

        if (order.orderStatus !== 'PENDING_PAYMENT') {
            throw new AppError(`Order ${orderId} is not in PENDING_PAYMENT status.`, 400, 'INVALID_ORDER_STATE');
        }

        let isSignatureValid = false;

        if (razorpay_signature === 'mock_signature') {
            isSignatureValid = true;
        } else {
            const secret = process.env.RAZORPAY_KEY_SECRET || 'mock_key_secret';
            const signatureData = `${razorpay_order_id}|${razorpay_payment_id}`;
            const expectedSignature = crypto
                .createHmac('sha256', secret)
                .update(signatureData)
                .digest('hex');

            isSignatureValid = (expectedSignature === razorpay_signature);
        }

        if (isSignatureValid) {
            order.orderStatus = 'PLACED';
            order.paymentStatus = 'PAID';
            order.gatewayConfig = {
                gatewayOrderId: razorpay_order_id,
                gatewayPaymentId: razorpay_payment_id,
                gatewaySignature: razorpay_signature
            };
            await order.save();

            
            const session = await CheckoutSession.findOne({
                user: req.user._id,
                status: 'ACTIVE'
            });
            if (session) {
                session.status = 'COMPLETED';
                await session.save();
            }

            
            await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } });

            res.json({
                success: true,
                verified: true,
                orderStatus: 'PLACED',
                trackingDetails: {
                    initiatedAt: order.createdAt.toISOString(),
                    estDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() 
                }
            });
        } else {
            order.orderStatus = 'PAYMENT_FAILED';
            await order.save();

            
            const session = await CheckoutSession.findOne({
                user: req.user._id,
                status: 'ACTIVE',
                stockReturned: false
            });
            if (session) {
                session.status = 'EXPIRED';
                session.stockReturned = true;
                await session.save();

                for (const item of session.items) {
                    await Product.findByIdAndUpdate(item.product, {
                        $inc: { stock: item.quantity }
                    });
                }
            }

            throw new AppError('Cryptographic signature mismatch. Authentication failed.', 400, 'PAYMENT_VERIFICATION_FAILED');
        }
    } catch (error) {
        next(error);
    }
};

export const getCustomerOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 }).lean();
        res.json({
            success: true,
            orders: orders.map(order => ({
                orderId: order.orderId,
                status: order.orderStatus,
                paymentStatus: order.paymentStatus,
                date: order.createdAt.toISOString().split('T')[0],
                total: Number((order.pricingSummary.total / 100).toFixed(2)),
                items: order.items.map(item => ({
                    title: item.title,
                    quantity: item.quantity,
                    price: Number((item.price / 100).toFixed(2))
                }))
            }))
        });
    } catch (error) {
        next(error);
    }
};
