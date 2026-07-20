import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true,
        trim: true
    },
    ownerName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    gstNumber: {
        type: String,
        trim: true
    },
    storeAddress: {
        type: String,
        required: true,
        trim: true
    },
    logo: {
        type: String,
        default: ''
    },
    banner: {
        type: String,
        default: ''
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['active', 'suspended', 'pending', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

storeSchema.virtual('address').get(function() {
    return this.storeAddress;
}).set(function(v) {
    this.storeAddress = v;
});

const Store = mongoose.model('Store', storeSchema);
export default Store;

