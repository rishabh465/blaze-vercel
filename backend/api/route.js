import app from './index.js';

export default async function handler(req, res) {
    // Connect to MongoDB
    try {
        const mongoose = (await import('mongoose')).default;
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }

    // Handle the request
    return app(req, res);
} 