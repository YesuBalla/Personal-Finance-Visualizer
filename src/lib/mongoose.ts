import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('⚠️ MONGODB_URI is missing in .env.local');
}

export async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error: any) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
}
