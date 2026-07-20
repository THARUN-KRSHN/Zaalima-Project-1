import User from '../models/User.js';
import Store from '../models/Store.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { AppError } from '../utils/AppError.js';


// ============================================================
// ADMIN DASHBOARD
// ============================================================

export const getAdminDashboard = async (req, res, next) => {
    try {
        const [totalUsers, totalVendors, totalOrders, productsCount] = await Promise.all([
            User.countDocuments({ role: 'customer' }),
            User.countDocuments({ role: { $in: ['vendor', 'superadmin'] } }),
            Order.countDocuments(),
            Product.countDocuments()
        ]);

        const revenueAgg = await Order.aggregate([
            { $match: { orderStatus: { $nin: ['PENDING_PAYMENT', 'CANCELLED'] } } },
            { $group: { _id: null, total: { $sum: '$pricingSummary.total' } } }
        ]);
        const totalRevenue = revenueAgg.length > 0
            ? Number((revenueAgg[0].total / 100).toFixed(2))
            : 0;

        // Month-over-month growth (simple: current vs last month)
        const now = new Date();
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

        const [thisMonthOrders, lastMonthOrders, thisMonthUsers, lastMonthUsers] = await Promise.all([
            Order.countDocuments({ createdAt: { $gte: startOfThisMonth } }),
            Order.countDocuments({ createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth } }),
            User.countDocuments({ role: 'customer', createdAt: { $gte: startOfThisMonth } }),
            User.countDocuments({ role: 'customer', createdAt: { $gte: startOfLastMonth, $lt: startOfThisMonth } })
        ]);

        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('customer', 'fullName email');

        res.json({
            success: true,
            data: {
                totalUsers,
                totalVendors,
                totalOrders,
                totalProducts: productsCount,
                totalRevenue,
                platformGrowth: {
                    orders: {
                        current: thisMonthOrders,
                        previous: lastMonthOrders,
                        delta: lastMonthOrders > 0
                            ? `+${(((thisMonthOrders - lastMonthOrders) / lastMonthOrders) * 100).toFixed(1)}%`
                            : '+100%'
                    },
                    users: {
                        current: thisMonthUsers,
                        previous: lastMonthUsers,
                        delta: lastMonthUsers > 0
                            ? `+${(((thisMonthUsers - lastMonthUsers) / lastMonthUsers) * 100).toFixed(1)}%`
                            : '+100%'
                    }
                },
                recentOrders: recentOrders.map(o => ({
                    orderId: o.orderId,
                    customer: o.customer?.fullName || o.shippingAddress?.fullName || 'N/A',
                    total: Number((o.pricingSummary.total / 100).toFixed(2)),
                    status: o.orderStatus,
                    date: o.createdAt.toISOString().split('T')[0]
                }))
            }
        });
    } catch (error) {
        next(error);
    }
};


// ============================================================
// USER MANAGEMENT
// ============================================================

export const getAllUsers = async (req, res, next) => {
    const { page = 1, limit = 20, search, role } = req.query;

    try {
        const query = {};
        if (role) query.role = role;
        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (Number(page) - 1) * Number(limit);
        const total = await User.countDocuments(query);
        const users = await User.find(query)
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.json({
            success: true,
            data: users,
            users,
            pagination: {
                page: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalItems: total
            }
        });
    } catch (error) {
        next(error);
    }
};


export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .populate('vendorStore');

        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};


export const updateUser = async (req, res, next) => {
    const { fullName, email, phone, role, isVerified } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        if (fullName !== undefined) user.fullName = fullName;
        if (email !== undefined) user.email = email;
        if (phone !== undefined) user.phone = phone;
        if (role !== undefined) user.role = role;
        if (isVerified !== undefined) user.isVerified = isVerified;

        await user.save();

        res.json({
            success: true,
            message: 'User updated successfully.',
            data: user
        });
    } catch (error) {
        next(error);
    }
};


export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
        }

        // Prevent deleting yourself
        if (user._id.toString() === req.user._id.toString()) {
            throw new AppError('You cannot delete your own admin account.', 400, 'FORBIDDEN');
        }

        await user.deleteOne();

        res.json({
            success: true,
            message: 'User deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};


// ============================================================
// VENDOR MANAGEMENT
// ============================================================

export const getAllVendors = async (req, res, next) => {
    const { page = 1, limit = 20, search, status } = req.query;

    try {
        const userQuery = { role: { $in: ['vendor', 'superadmin'] } };
        if (search) {
            userQuery.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (Number(page) - 1) * Number(limit);
        const total = await User.countDocuments(userQuery);
        const vendors = await User.find(userQuery)
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .populate('vendorStore')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.json({
            success: true,
            data: vendors,
            vendors,
            pagination: {
                page: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalItems: total
            }
        });
    } catch (error) {
        next(error);
    }
};


export const approveVendor = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('vendorStore');
        if (!user || !['vendor', 'superadmin'].includes(user.role)) {
            throw new AppError('Vendor not found.', 404, 'VENDOR_NOT_FOUND');
        }

        if (user.vendorStore) {
            await Store.findByIdAndUpdate(user.vendorStore._id, { isApproved: true, status: 'active' });
        }
        user.isVerified = true;
        await user.save();

        res.json({
            success: true,
            message: 'Vendor approved successfully.'
        });
    } catch (error) {
        next(error);
    }
};


export const rejectVendor = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('vendorStore');
        if (!user || !['vendor', 'superadmin'].includes(user.role)) {
            throw new AppError('Vendor not found.', 404, 'VENDOR_NOT_FOUND');
        }

        if (user.vendorStore) {
            await Store.findByIdAndUpdate(user.vendorStore._id, { isApproved: false, status: 'rejected' });
        }

        res.json({
            success: true,
            message: 'Vendor rejected successfully.'
        });
    } catch (error) {
        next(error);
    }
};


export const updateVendorStatus = async (req, res, next) => {
    const { status } = req.body;

    try {
        const validStatuses = ['active', 'suspended', 'pending'];
        if (!status || !validStatuses.includes(status)) {
            throw new AppError(`Status must be one of: ${validStatuses.join(', ')}`, 400, 'INVALID_PARAMETERS');
        }

        const user = await User.findById(req.params.id).populate('vendorStore');
        if (!user || !['vendor', 'superadmin'].includes(user.role)) {
            throw new AppError('Vendor not found.', 404, 'VENDOR_NOT_FOUND');
        }

        if (user.vendorStore) {
            await Store.findByIdAndUpdate(user.vendorStore._id, { status });
        }

        res.json({
            success: true,
            message: `Vendor status updated to ${status}.`
        });
    } catch (error) {
        next(error);
    }
};


// ============================================================
// PRODUCT MANAGEMENT (Admin)
// ============================================================

export const getAllProductsAdmin = async (req, res, next) => {
    const { page = 1, limit = 20, search, category, vendor } = req.query;

    try {
        const query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } }
            ];
        }
        if (category) query.category = { $regex: new RegExp(`^${category}$`, 'i') };
        if (vendor) query.vendor = vendor;

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Product.countDocuments(query);
        const products = await Product.find(query)
            .populate('vendor', 'fullName email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.json({
            success: true,
            data: products.map(p => ({
                ...p.toObject(),
                id: p._id.toString(),
                price: Number((p.price / 100).toFixed(2))
            })),
            products: products.map(p => ({
                ...p.toObject(),
                id: p._id.toString(),
                price: Number((p.price / 100).toFixed(2))
            })),
            pagination: {
                page: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalItems: total
            }
        });
    } catch (error) {
        next(error);
    }
};


export const deleteProductAdmin = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            throw new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND');
        }

        res.json({
            success: true,
            message: 'Product deleted by admin successfully.'
        });
    } catch (error) {
        next(error);
    }
};


export const featureProduct = async (req, res, next) => {
    const { featured } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            throw new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND');
        }

        product.tag = featured !== false ? 'Featured' : '';
        await product.save();

        res.json({
            success: true,
            message: `Product ${featured !== false ? 'featured' : 'unfeatured'} successfully.`
        });
    } catch (error) {
        next(error);
    }
};


// ============================================================
// ORDER MANAGEMENT (Admin)
// ============================================================

export const getAllOrdersAdmin = async (req, res, next) => {
    const { page = 1, limit = 20, status, search } = req.query;

    try {
        const query = {};
        if (status) query.orderStatus = status.toUpperCase();
        if (search) query.orderId = { $regex: search, $options: 'i' };

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Order.countDocuments(query);
        const orders = await Order.find(query)
            .populate('customer', 'fullName email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.json({
            success: true,
            data: orders.map(o => ({
                ...o.toObject(),
                total: Number((o.pricingSummary.total / 100).toFixed(2))
            })),
            orders: orders.map(o => ({
                ...o.toObject(),
                total: Number((o.pricingSummary.total / 100).toFixed(2))
            })),
            pagination: {
                page: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalItems: total
            }
        });
    } catch (error) {
        next(error);
    }
};


export const getOrderByIdAdmin = async (req, res, next) => {
    try {
        const order = await Order.findOne({ orderId: req.params.orderId })
            .populate('customer', 'fullName email phone');

        if (!order) {
            throw new AppError('Order not found.', 404, 'ORDER_NOT_FOUND');
        }

        res.json({
            success: true,
            data: {
                ...order.toObject(),
                pricingSummary: {
                    ...order.pricingSummary,
                    subtotal: Number((order.pricingSummary.subtotal / 100).toFixed(2)),
                    tax: Number((order.pricingSummary.tax / 100).toFixed(2)),
                    shipping: Number((order.pricingSummary.shipping / 100).toFixed(2)),
                    discount: Number((order.pricingSummary.discount / 100).toFixed(2)),
                    total: Number((order.pricingSummary.total / 100).toFixed(2))
                }
            }
        });
    } catch (error) {
        next(error);
    }
};


export const updateOrderAdmin = async (req, res, next) => {
    const { orderStatus, paymentStatus } = req.body;

    try {
        const order = await Order.findOne({ orderId: req.params.orderId });
        if (!order) {
            throw new AppError('Order not found.', 404, 'ORDER_NOT_FOUND');
        }

        const validOrderStatuses = ['PENDING_PAYMENT', 'PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
        const validPaymentStatuses = ['PENDING', 'PAID', 'FAILED'];

        if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
            throw new AppError(`Invalid order status. Valid values: ${validOrderStatuses.join(', ')}`, 400, 'INVALID_PARAMETERS');
        }
        if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
            throw new AppError(`Invalid payment status. Valid values: ${validPaymentStatuses.join(', ')}`, 400, 'INVALID_PARAMETERS');
        }

        if (orderStatus) order.orderStatus = orderStatus;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        await order.save();

        res.json({
            success: true,
            message: 'Order updated successfully.',
            data: { orderId: order.orderId, orderStatus: order.orderStatus, paymentStatus: order.paymentStatus }
        });
    } catch (error) {
        next(error);
    }
};


// ============================================================
// PLATFORM ANALYTICS (Admin)
// ============================================================

export const getAdminAnalytics = async (req, res, next) => {
    try {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentYear = new Date().getFullYear();

        // Monthly revenue and order trends
        const revenueAgg = await Order.aggregate([
            {
                $match: {
                    orderStatus: { $nin: ['PENDING_PAYMENT', 'CANCELLED'] },
                    createdAt: { $gte: new Date(currentYear, 0, 1), $lt: new Date(currentYear + 1, 0, 1) }
                }
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    revenue: { $sum: '$pricingSummary.total' },
                    orders: { $sum: 1 }
                }
            }
        ]);

        // Monthly user/vendor growth
        const userGrowthAgg = await User.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(currentYear, 0, 1), $lt: new Date(currentYear + 1, 0, 1) }
                }
            },
            {
                $group: {
                    _id: { month: { $month: '$createdAt' }, role: '$role' },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Build monthly series
        const monthlySeries = months.map((month, idx) => {
            const monthNum = idx + 1;
            const revData = revenueAgg.find(r => r._id === monthNum);
            const customerData = userGrowthAgg.find(u => u._id.month === monthNum && u._id.role === 'customer');
            const vendorData = userGrowthAgg.find(u => u._id.month === monthNum && u._id.role === 'vendor');

            return {
                month,
                revenue: revData ? Number((revData.revenue / 100).toFixed(2)) : 0,
                orders: revData ? revData.orders : 0,
                newCustomers: customerData ? customerData.count : 0,
                newVendors: vendorData ? vendorData.count : 0
            };
        });

        // Platform totals
        const [totalRevAgg, totalUsers, totalVendors, totalOrders, totalProducts] = await Promise.all([
            Order.aggregate([
                { $match: { orderStatus: { $nin: ['PENDING_PAYMENT', 'CANCELLED'] } } },
                { $group: { _id: null, total: { $sum: '$pricingSummary.total' } } }
            ]),
            User.countDocuments({ role: 'customer' }),
            User.countDocuments({ role: { $in: ['vendor', 'superadmin'] } }),
            Order.countDocuments(),
            Product.countDocuments()
        ]);

        res.json({
            success: true,
            data: {
                summary: {
                    totalRevenue: totalRevAgg.length > 0 ? Number((totalRevAgg[0].total / 100).toFixed(2)) : 0,
                    totalUsers,
                    totalVendors,
                    totalOrders,
                    totalProducts
                },
                monthlySeries
            }
        });
    } catch (error) {
        next(error);
    }
};
