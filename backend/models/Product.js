import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true
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
    images: [{ type: String }],
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    specifications: {
        type: Map,
        of: String,
        default: {}
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
    isFeatured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

productSchema.virtual('vendorId').get(function() {
    return this.vendor;
}).set(function(v) {
    this.vendor = v;
});

productSchema.virtual('reviewsCount').get(function() {
    return this.reviewCount;
}).set(function(v) {
    this.reviewCount = v;
});



// Auto-generate slug and sync name/title
productSchema.pre('save', function (next) {
    // Sync name <-> title
    if (!this.name && this.title) this.name = this.title;
    if (!this.title && this.name) this.title = this.name;

    // Auto-generate slug from title
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    // Sync primary image to images array
    if (this.image && (!this.images || this.images.length === 0)) {
        this.images = [this.image];
    }

    // Update status based on stock
    if (this.stock === 0) {
        this.status = 'OUT_OF_STOCK';
    } else if (this.stock <= 5) {
        this.status = 'LOW_STOCK';
    } else {
        this.status = 'ACTIVE';
    }

    this.updatedAt = new Date();
    next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
