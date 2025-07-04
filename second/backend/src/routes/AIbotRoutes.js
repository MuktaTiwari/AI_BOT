// src/routes/AIbotRoutes.js
import { Router } from 'express';
import AIbotController from '../controller/AIbotController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

class AIbotRoutes {
    router = Router();
    AIbotController = new AIbotController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(
            `/create`,
            authenticateToken, // Add authentication middleware
            this.AIbotController.createAIbot.bind(this.AIbotController)
        );
    }
}

export default AIbotRoutes;