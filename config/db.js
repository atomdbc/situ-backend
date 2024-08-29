import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log('Situ DB connected....');
        
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

export default connectDB;
