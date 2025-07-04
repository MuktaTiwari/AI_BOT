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
        this.router.post(`/create`,authenticateToken, this.AIbotController.createAIbot.bind(this.AIbotController));
        this.router.get(`/bots`, authenticateToken, this.AIbotController.getAIbotList.bind(this.AIbotController));
    }
}

export default AIbotRoutes;