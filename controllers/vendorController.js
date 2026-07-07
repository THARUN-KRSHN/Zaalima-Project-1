import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';


const getVendorOrderData = (order, vendorId) => {
    const items = order.items.filter(item => item.vendor.toString() === vendorId.toString());
    
    
    const amountInPaise = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const amountInRupees = Number((amountInPaise / 100).toFixed(2));

    const dateStr = order.createdAt.toISOString().split('T')[0];

    
    let displayStatus = 'Pending';
    if (order.orderStatus === 'PLACED') displayStatus = 'Pending';
    else if (order.orderStatus === 'PENDING_PAYMENT') displayStatus = 'Pending';
    else if (order.orderStatus === 'PROCESSING') displayStatus = 'Processing';
    else if (order.orderStatus === 'SHIPPED') displayStatus = 'Shipped';
    else if (order.orderStatus === 'DELIVERED') displayStatus = 'Delivered';
    else if (order.orderStatus === 'CANCELLED') displayStatus = 'Cancelled';

    return {
        id: order.orderId,
        customer: order.shippingAddress.fullName,
        amount: amountInRupees,
        status: displayStatus,
        date: dateStr,
        items: items.map(item => ({
            title: item.title,
            quantity: item.quantity,
            skuPrice: Number((item.price / 100).toFixed(2))
        }))
    };
};




export const getVendorDashboardSummary = async (req, res, next) => {
    const vendorId = req.user._id;

    try {
        
        const totalProducts = await Product.countDocuments({ vendor: vendorId });

        
        const orders = await Order.find({ 'items.vendor': vendorId });

        
        let totalRevenuePaise = 0;
        let todayRevenuePaise = 0;
        let monthlyRevenuePaise = 0;
        let yearlyRevenuePaise = 0;

        const customerIds = new Set();
        const vendorOrders = [];

        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const startOfThisMonth = new Date();
        startOfThisMonth.setDate(1);
        startOfThisMonth.setHours(0, 0, 0, 0);

        const startOfThisYear = new Date();
        startOfThisYear.setMonth(0, 1);
        startOfThisYear.setHours(0, 0, 0, 0);

        for (const order of orders) {
            
            const countForRevenue = order.orderStatus !== 'PENDING_PAYMENT' && order.orderStatus !== 'CANCELLED';
            const orderVendorItems = order.items.filter(item => item.vendor.toString() === vendorId.toString());
            const orderVendorTotal = orderVendorItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

            if (countForRevenue) {
                totalRevenuePaise += orderVendorTotal;

                if (order.createdAt >= startOfToday) {
                    todayRevenuePaise += orderVendorTotal;
                }
                if (order.createdAt >= startOfThisMonth) {
                    monthlyRevenuePaise += orderVendorTotal;
                }
                if (order.createdAt >= startOfThisYear) {
                    yearlyRevenuePaise += orderVendorTotal;
                }
            }

            customerIds.add(order.customer.toString());
            vendorOrders.push(getVendorOrderData(order, vendorId));
        }

        
        const recentOrders = vendorOrders
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        res.json({
            success: true,
            dashboardStats: {
                totalRevenue: Number((totalRevenuePaise / 100).toFixed(2)),
                totalOrders: orders.length,
                totalProducts,
                totalCustomers: customerIds.size,
                growthRates: {
                    revenue: '+15.4%',
                    orders: '+8.2%',
                    products: '+2.1%',
                    customers: '+12.1%'
                }
            },
            revenueBreakdown: {
                today: { amount: Number((todayRevenuePaise / 100).toFixed(2)), delta: '+4.2%' },
                monthly: { amount: Number((monthlyRevenuePaise / 100).toFixed(2)), delta: '+15.8%' },
                yearly: { amount: Number((yearlyRevenuePaise / 100).toFixed(2)), delta: '+22.4%' }
            },
            recentOrders
        });
    } catch (error) {
        next(error);
    }
};




export const getVendorOrdersLedger = async (req, res, next) => {
    const vendorId = req.user._id;
    const { page = 1, limit = 20, status } = req.query;

    try {
        const query = { 'items.vendor': vendorId };

        if (status) {
            let dbStatus;
            if (status.toLowerCase() === 'pending') dbStatus = { $in: ['PLACED', 'PENDING_PAYMENT'] };
            else if (status.toLowerCase() === 'processing') dbStatus = 'PROCESSING';
            else if (status.toLowerCase() === 'shipped') dbStatus = 'SHIPPED';
            else if (status.toLowerCase() === 'delivered') dbStatus = 'DELIVERED';
            else if (status.toLowerCase() === 'cancelled') dbStatus = 'CANCELLED';

            if (dbStatus) {
                query.orderStatus = dbStatus;
            }
        }

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Order.countDocuments(query);
        
        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.json({
            success: true,
            metaData: {
                totalRecords: total,
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit))
            },
            orders: orders.map(order => getVendorOrderData(order, vendorId))
        });
    } catch (error) {
        next(error);
    }
};




export const getVendorProductsCatalog = async (req, res, next) => {
    const vendorId = req.user._id;

    try {
        const products = await Product.find({ vendor: vendorId });

        res.json({
            success: true,
            products: products.map(prod => ({
                productId: prod._id.toString(),
                title: prod.title,
                stockCount: prod.stock,
                basePrice: Number((prod.price / 100).toFixed(2)),
                status: prod.status
            }))
        });
    } catch (error) {
        next(error);
    }
};




export const updateVendorOrderStatus = async (req, res, next) => {
    const vendorId = req.user._id;
    const { orderId } = req.params;
    const { status } = req.body; 

    try {
        const order = await Order.findOne({ orderId, 'items.vendor': vendorId });
        if (!order) {
            throw new AppError(`Order ${orderId} not found or doesn't contain items from this vendor.`, 404, 'ORDER_NOT_FOUND');
        }

        let targetStatus;
        if (!status) {
            throw new AppError('Status parameter is required.', 400, 'INVALID_PARAMETERS', {
                status: 'Status parameter is required.'
            });
        }

        const normStatus = status.toLowerCase();
        if (normStatus === 'processing') targetStatus = 'PROCESSING';
        else if (normStatus === 'shipped') targetStatus = 'SHIPPED';
        else if (normStatus === 'delivered') targetStatus = 'DELIVERED';
        else if (normStatus === 'cancelled') targetStatus = 'CANCELLED';
        else {
            throw new AppError(`Invalid status transition requested: ${status}`, 400, 'INVALID_PARAMETERS');
        }

        const currentStatus = order.orderStatus;

        if (currentStatus === 'DELIVERED' || currentStatus === 'CANCELLED') {
            throw new AppError(`Order ${orderId} is finalized and cannot be modified.`, 400, 'ORDER_FINALIZED');
        }

        let isTransitionValid = false;

        if (currentStatus === 'PENDING_PAYMENT' || currentStatus === 'PLACED') {
            if (targetStatus === 'PROCESSING' || targetStatus === 'CANCELLED') {
                isTransitionValid = true;
            }
        } else if (currentStatus === 'PROCESSING') {
            if (targetStatus === 'SHIPPED') {
                isTransitionValid = true;
            }
        } else if (currentStatus === 'SHIPPED') {
            if (targetStatus === 'DELIVERED') {
                isTransitionValid = true;
            }
        }

        if (!isTransitionValid) {
            throw new AppError(`Invalid state transition: Cannot change status from ${currentStatus} to ${targetStatus}.`, 400, 'INVALID_STATUS_TRANSITION');
        }

        order.orderStatus = targetStatus;
        
        if (targetStatus === 'CANCELLED') {
            for (const item of order.items) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { stock: item.quantity }
                });
            }
        }

        await order.save();

        res.json({
            success: true,
            orderStatus: targetStatus,
            message: `Order status successfully transitioned to ${status}.`
        });
    } catch (error) {
        next(error);
    }
};
