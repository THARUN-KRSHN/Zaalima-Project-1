import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`⚠️ Database Connection Error: ${error.message}`);
        console.error(`⚠️ The API server will continue running, but database features will fail until connection succeeds.`);
    }
};

export default connectDB;
