import app from './index.js';

export default async function handler(req, res) {
    // Check for required environment variables
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined in environment variables');
        return res.status(500).json({ 
            error: 'Server Configuration Error',
            message: 'Database connection string is not configured'
        });
    }

    // Connect to MongoDB
    try {
        const mongoose = (await import('mongoose')).default;
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        return res.status(500).json({ 
            error: 'Database Connection Error',
            message: 'Failed to connect to database'
        });
    }

    // Handle the request
    return app(req, res);
} 