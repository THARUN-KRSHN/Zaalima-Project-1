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
    gstNumber: {
        type: String,
        trim: true
    },
    storeAddress: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Store = mongoose.model('Store', storeSchema);
export default Store;
