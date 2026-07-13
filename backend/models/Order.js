import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true 
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const shippingAddressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
        type: String,
        enum: ['razorpay', 'cod'],
        default: 'razorpay'
    },
    paymentStatus: {
        type: String,
        enum: ['PENDING', 'PAID', 'FAILED'],
        default: 'PENDING'
    },
    orderStatus: {
        type: String,
        enum: ['PENDING_PAYMENT', 'PLACED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
        default: 'PENDING_PAYMENT'
    },
    pricingSummary: {
        subtotal: { type: Number, required: true }, 
        discount: { type: Number, default: 0 },    
        tax: { type: Number, required: true },      
        shipping: { type: Number, required: true }, 
        total: { type: Number, required: true }     
    },
    gatewayConfig: {
        gatewayOrderId: { type: String },
        gatewayPaymentId: { type: String },
        gatewaySignature: { type: String }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// BRS schema field compatibility virtuals
orderSchema.virtual('customerId').get(function() {
    return this.customer;
});

orderSchema.virtual('products').get(function() {
    return this.items;
});

orderSchema.virtual('totalAmount').get(function() {
    return this.pricingSummary.total;
});

orderSchema.virtual('subtotal').get(function() {
    return this.pricingSummary.subtotal;
});

orderSchema.virtual('tax').get(function() {
    return this.pricingSummary.tax;
});

orderSchema.virtual('shipping').get(function() {
    return this.pricingSummary.shipping;
});

const Order = mongoose.model('Order', orderSchema);
export default Order;

