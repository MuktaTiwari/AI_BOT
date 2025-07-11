import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './src/config/db.js';
dotenv.config();

// Import models first to ensure they're registered
import './src/models/AIbotModel.js';
import './src/models/UserModel.js';

// Then import routes
import AIbotRoutes from './src/routes/AIbotRoutes.js';
import AuthRoutes from './src/routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
try {
    await connectDB();
    await sequelize.sync({ alter: true });
    console.log('Database connected and synchronized');
} catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
}

// Initialize routes
const aiBotRoutes = new AIbotRoutes();
const authRoutes = new AuthRoutes();

app.use('/ai', aiBotRoutes.router);
app.use('/auth', authRoutes.router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));