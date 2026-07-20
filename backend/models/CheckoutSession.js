import mongoose from 'mongoose';

const checkoutItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    lockedPrice: {
        type: Number,
        required: true 
    }
});

const checkoutSessionSchema = new mongoose.Schema({
    checkoutToken: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [checkoutItemSchema],
    discount: {
        type: Number,
        default: 0 
    },
    expiresAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'COMPLETED', 'EXPIRED'],
        default: 'ACTIVE'
    },
    stockReturned: {
        type: Boolean,
        default: false
    }
});

const CheckoutSession = mongoose.model('CheckoutSession', checkoutSessionSchema);
export default CheckoutSession;
