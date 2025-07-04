import { Router } from 'express';
import AIbotController from '../controller/AIbotController.js';
class AIbotRoutes{
  path = '/aibot';
  router = Router();
  AIbotController = new AIbotController();

  constructor() {
    this.initializeRoutes();
  }

initializeRoutes() {
    this.router.get(`${this.path}/add`, this.AIbotController.createAIbot.bind(this.AIbotController));

  }
}

export default AIbotRoutes;