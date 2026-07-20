import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    addressLine1: { type: String, required: true, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    country: { type: String, default: 'India', trim: true },
    isDefault: { type: Boolean, default: false }
}, { _id: true });

const userSchema = new mongoose.Schema({
    fullName: {
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
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['customer', 'vendor', 'admin', 'superadmin'],
        default: 'customer'
    },
    avatar: {
        type: String,
        default: ''
    },
    vendorStore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    addresses: [addressSchema],
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
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

userSchema.virtual('name').get(function() {
    return this.fullName;
}).set(function(v) {
    this.fullName = v;
});


userSchema.pre('save', async function (next) {
    this.updatedAt = new Date();
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
