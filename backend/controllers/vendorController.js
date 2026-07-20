import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Store from '../models/Store.js';
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
        orderId: order.orderId,
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


// ============================================================
// DASHBOARD
// ============================================================

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
                if (order.createdAt >= startOfToday) todayRevenuePaise += orderVendorTotal;
                if (order.createdAt >= startOfThisMonth) monthlyRevenuePaise += orderVendorTotal;
                if (order.createdAt >= startOfThisYear) yearlyRevenuePaise += orderVendorTotal;
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


// ============================================================
// ORDERS
// ============================================================

export const getVendorOrdersLedger = async (req, res, next) => {
    const vendorId = req.user._id;
    const { page = 1, limit = 20, status } = req.query;

    try {
        const query = { 'items.vendor': vendorId };

        if (status) {
            const normStatus = status.toLowerCase();
            let dbStatus;
            if (normStatus === 'pending') dbStatus = { $in: ['PLACED', 'PENDING_PAYMENT'] };
            else if (normStatus === 'processing') dbStatus = 'PROCESSING';
            else if (normStatus === 'shipped') dbStatus = 'SHIPPED';
            else if (normStatus === 'delivered') dbStatus = 'DELIVERED';
            else if (normStatus === 'cancelled') dbStatus = 'CANCELLED';
            if (dbStatus) query.orderStatus = dbStatus;
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


export const updateVendorOrderStatus = async (req, res, next) => {
    const vendorId = req.user._id;
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findOne({ orderId, 'items.vendor': vendorId });
        if (!order) {
            throw new AppError(`Order ${orderId} not found or doesn't contain items from this vendor.`, 404, 'ORDER_NOT_FOUND');
        }

        if (!status) {
            throw new AppError('Status parameter is required.', 400, 'INVALID_PARAMETERS', {
                status: 'Status parameter is required.'
            });
        }

        const normStatus = status.toLowerCase();
        let targetStatus;
        if (normStatus === 'processing') targetStatus = 'PROCESSING';
        else if (normStatus === 'shipped') targetStatus = 'SHIPPED';
        else if (normStatus === 'delivered') targetStatus = 'DELIVERED';
        else if (normStatus === 'cancelled') targetStatus = 'CANCELLED';
        else {
            throw new AppError(`Invalid status: ${status}`, 400, 'INVALID_PARAMETERS');
        }

        const currentStatus = order.orderStatus;
        if (currentStatus === 'DELIVERED' || currentStatus === 'CANCELLED') {
            throw new AppError(`Order ${orderId} is finalized and cannot be modified.`, 400, 'ORDER_FINALIZED');
        }

        let isTransitionValid = false;
        if ((currentStatus === 'PENDING_PAYMENT' || currentStatus === 'PLACED') &&
            (targetStatus === 'PROCESSING' || targetStatus === 'CANCELLED')) {
            isTransitionValid = true;
        } else if (currentStatus === 'PROCESSING' && targetStatus === 'SHIPPED') {
            isTransitionValid = true;
        } else if (currentStatus === 'SHIPPED' && targetStatus === 'DELIVERED') {
            isTransitionValid = true;
        }

        if (!isTransitionValid) {
            throw new AppError(`Invalid state transition: Cannot change from ${currentStatus} to ${targetStatus}.`, 400, 'INVALID_STATUS_TRANSITION');
        }

        order.orderStatus = targetStatus;

        if (targetStatus === 'CANCELLED') {
            for (const item of order.items) {
                await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
            }
        }

        await order.save();

        res.json({
            success: true,
            orderStatus: targetStatus,
            message: `Order status successfully updated to ${status}.`
        });
    } catch (error) {
        next(error);
    }
};


// ============================================================
// PRODUCTS (Vendor CRUD)
// ============================================================

export const getVendorProductsCatalog = async (req, res, next) => {
    const vendorId = req.user._id;
    const { page = 1, limit = 50 } = req.query;

    try {
        const skip = (Number(page) - 1) * Number(limit);
        const total = await Product.countDocuments({ vendor: vendorId });
        const products = await Product.find({ vendor: vendorId })
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            products: products.map(prod => ({
                productId: prod._id.toString(),
                id: prod._id.toString(),
                _id: prod._id,
                title: prod.title,
                brand: prod.brand,
                category: prod.category,
                image: prod.image,
                stockCount: prod.stock,
                stock: prod.stock,
                basePrice: Number((prod.price / 100).toFixed(2)),
                price: Number((prod.price / 100).toFixed(2)),
                status: prod.status,
                rating: prod.rating,
                tag: prod.tag,
                createdAt: prod.createdAt
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


export const createVendorProduct = async (req, res, next) => {
    const { title, brand, category, description, image, price, stock, tag } = req.body;

    try {
        const validationErrors = {};
        if (!title || !title.trim()) validationErrors.title = 'Product title is required.';
        if (!brand || !brand.trim()) validationErrors.brand = 'Brand name is required.';
        if (!category || !category.trim()) validationErrors.category = 'Category is required.';
        if (!image || !image.trim()) validationErrors.image = 'Product image URL is required.';
        if (price === undefined || isNaN(price) || Number(price) <= 0) {
            validationErrors.price = 'Valid product price is required (must be > 0).';
        }
        if (stock === undefined || isNaN(stock) || Number(stock) < 0) {
            validationErrors.stock = 'Stock must be a non-negative number.';
        }

        if (Object.keys(validationErrors).length > 0) {
            throw new AppError('Product validation failed.', 400, 'INVALID_PARAMETERS', validationErrors);
        }

        const priceInPaise = Math.round(Number(price) * 100);

        const product = await Product.create({
            title,
            brand,
            category,
            description,
            image,
            price: priceInPaise,
            stock: Number(stock),
            vendor: req.user._id,
            tag
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully.',
            product: {
                ...product.toObject(),
                id: product._id.toString(),
                price: Number((product.price / 100).toFixed(2))
            }
        });
    } catch (error) {
        next(error);
    }
};


export const updateVendorProduct = async (req, res, next) => {
    const { title, brand, category, description, image, price, stock, tag } = req.body;

    try {
        let product = await Product.findById(req.params.productId);
        if (!product) {
            throw new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND');
        }

        if (product.vendor.toString() !== req.user._id.toString() && !['superadmin', 'admin'].includes(req.user.role)) {
            throw new AppError('Not authorized to modify this product.', 403, 'FORBIDDEN');
        }

        if (title !== undefined) product.title = title;
        if (brand !== undefined) product.brand = brand;
        if (category !== undefined) product.category = category;
        if (description !== undefined) product.description = description;
        if (image !== undefined) product.image = image;
        if (price !== undefined) product.price = Math.round(Number(price) * 100);
        if (stock !== undefined) product.stock = Number(stock);
        if (tag !== undefined) product.tag = tag;

        const updatedProduct = await product.save();

        res.json({
            success: true,
            message: 'Product updated successfully.',
            product: {
                ...updatedProduct.toObject(),
                id: updatedProduct._id.toString(),
                price: Number((updatedProduct.price / 100).toFixed(2))
            }
        });
    } catch (error) {
        next(error);
    }
};


export const deleteVendorProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            throw new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND');
        }

        if (product.vendor.toString() !== req.user._id.toString() && !['superadmin', 'admin'].includes(req.user.role)) {
            throw new AppError('Not authorized to delete this product.', 403, 'FORBIDDEN');
        }

        await product.deleteOne();

        res.json({
            success: true,
            message: 'Product deleted successfully.'
        });
    } catch (error) {
        next(error);
    }
};


export const updateInventoryStock = async (req, res, next) => {
    const { stock } = req.body;

    try {
        if (stock === undefined || isNaN(stock) || Number(stock) < 0) {
            throw new AppError('Stock must be a non-negative number.', 400, 'INVALID_PARAMETERS', {
                stock: 'Stock must be a non-negative number.'
            });
        }

        const product = await Product.findById(req.params.productId);
        if (!product) {
            throw new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND');
        }

        if (product.vendor.toString() !== req.user._id.toString() && !['superadmin', 'admin'].includes(req.user.role)) {
            throw new AppError('Not authorized to update this product.', 403, 'FORBIDDEN');
        }

        product.stock = Number(stock);
        await product.save();

        res.json({
            success: true,
            message: 'Inventory stock updated successfully.',
            data: {
                productId: product._id.toString(),
                stock: product.stock,
                status: product.status
            }
        });
    } catch (error) {
        next(error);
    }
};


// ============================================================
// VENDOR PROFILE / SETTINGS
// ============================================================

export const getVendorProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
            .select('-password -resetPasswordToken -resetPasswordExpires')
            .populate('vendorStore');

        if (!user) {
            throw new AppError('Vendor not found.', 404, 'VENDOR_NOT_FOUND');
        }

        res.json({
            success: true,
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                role: user.role,
                store: user.vendorStore,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        next(error);
    }
};


export const updateVendorProfile = async (req, res, next) => {
    const { storeName, ownerName, phone, storeAddress, gstNumber, logo, banner } = req.body;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            throw new AppError('Vendor not found.', 404, 'VENDOR_NOT_FOUND');
        }

        if (ownerName !== undefined) user.fullName = ownerName;
        if (phone !== undefined) user.phone = phone;
        if (logo !== undefined) user.avatar = logo;
        await user.save();

        // Update store
        if (user.vendorStore) {
            const storeUpdate = {};
            if (storeName !== undefined) storeUpdate.storeName = storeName;
            if (ownerName !== undefined) storeUpdate.ownerName = ownerName;
            if (storeAddress !== undefined) storeUpdate.storeAddress = storeAddress;
            if (gstNumber !== undefined) storeUpdate.gstNumber = gstNumber;
            if (logo !== undefined) storeUpdate.logo = logo;
            if (banner !== undefined) storeUpdate.banner = banner;

            await Store.findByIdAndUpdate(user.vendorStore, storeUpdate);
        }

        res.json({
            success: true,
            message: 'Vendor profile updated successfully.'
        });
    } catch (error) {
        next(error);
    }
};


export const updateVendorPassword = async (req, res, next) => {
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
