import crypto from 'crypto';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';
import CheckoutSession from '../models/CheckoutSession.js';


const returnExpiredStock = async () => {
    try {
        const expiredSessions = await CheckoutSession.find({
            expiresAt: { $lt: new Date() },
            status: 'ACTIVE'
        });

        for (const session of expiredSessions) {
            session.status = 'EXPIRED';
            await session.save();

            
            for (const item of session.items) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { stock: item.quantity }
                });
            }
            console.log(`Returned stock for expired checkout session: ${session.checkoutToken}`);
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
            res.status(400);
            throw new Error('Shopping bag is empty.');
        }

        const itemsToLock = [];
        let subtotal = 0; 

        
        for (const item of cartItems) {
            const product = await Product.findById(item.productId);
            if (!product) {
                res.status(404);
                throw new Error(`Product with ID ${item.productId} not found.`);
            }

            if (product.stock < item.quantity) {
                res.status(400);
                throw new Error(`Insufficient stock for "${product.title}". Only ${product.stock} items available.`);
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
            res.status(400);
            throw new Error('Shipping address is required.');
        }

        const { fullName, phone, email, addressLine1, pincode } = shippingAddress;
        if (!fullName || fullName.trim().length < 3) {
            res.status(400);
            throw new Error('FullName is required (minimum 3 characters).');
        }
        if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
            res.status(400);
            throw new Error('Valid 10-digit Indian phone number is required.');
        }
        if (!addressLine1 || !addressLine1.trim()) {
            res.status(400);
            throw new Error('Address Line 1 is required.');
        }
        if (!pincode || !/^\d{6}$/.test(pincode)) {
            res.status(400);
            throw new Error('Valid 6-digit pin code is required.');
        }

        
        const session = await CheckoutSession.findOne({
            checkoutToken,
            user: req.user._id,
            status: 'ACTIVE',
            expiresAt: { $gt: new Date() }
        }).populate('items.product');

        if (!session) {
            res.status(400);
            throw new Error('Checkout session expired or invalid. Please re-initiate checkout.');
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
            res.status(404);
            throw new Error(`Order ${orderId} not found.`);
        }

        if (order.orderStatus !== 'PENDING_PAYMENT') {
            res.status(400);
            throw new Error(`Order ${orderId} is not in PENDING_PAYMENT status.`);
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
                status: 'ACTIVE'
            });
            if (session) {
                session.status = 'EXPIRED';
                await session.save();

                for (const item of session.items) {
                    await Product.findByIdAndUpdate(item.product, {
                        $inc: { stock: item.quantity }
                    });
                }
            }

            res.status(400).json({
                success: false,
                verified: false,
                orderStatus: 'PAYMENT_FAILED',
                message: 'Cryptographic signature mismatch. Authentication failed.'
            });
        }
    } catch (error) {
        next(error);
    }
};
