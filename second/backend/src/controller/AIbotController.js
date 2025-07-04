// src/controller/AIbotController.js
import AIbotService from '../service/AIbotService.js';

class AIbotController {
    AIbotService = new AIbotService();

    async createAIbot(req, res) {
        try {
            const aiData = {
                ...req.body,
                userId: req.user.id
            };
            const data = await this.AIbotService.createAIbot(aiData);

            if (!data) {
                return res.status(400).json({
                    success: false,
                    message: 'Failed to create AI bot'
                });
            }

            res.status(201).json({
                success: true,
                message: 'AI bot created successfully',
                data: data
            });
        } catch (error) {
            console.error('Error creating AI bot:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }



    async getAIbotList(req, res) {
        try {
            const userId = req.user.id;
            const bots = await this.AIbotService.getAIbotList(userId);

            if (!bots || bots.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No AI bots found for this user'
                });
            }

            res.status(200).json({
                success: true,
                message: 'AI bots retrieved successfully',
                data: bots
            });
        } catch (error) {
            console.error('Error retrieving AI bots:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }



}

export default AIbotController;