import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true 
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'LOW_STOCK', 'OUT_OF_STOCK'],
        default: 'ACTIVE'
    },
    rating: {
        type: Number,
        default: 4.0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    tag: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


productSchema.pre('save', function (next) {
    if (this.stock === 0) {
        this.status = 'OUT_OF_STOCK';
    } else if (this.stock <= 5) {
        this.status = 'LOW_STOCK';
    } else {
        this.status = 'ACTIVE';
    }
    next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
