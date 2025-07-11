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

    async getAllAIBot(req, res) {

        try {

            const bots = await this.AIbotService.getAllAIBot();
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


    async getTotalBots(req, res) {
        try {
            const totalBots = await this.AIbotService.getTotalBots();

            if (totalBots === null) {
                return res.status(404).json({
                    success: false,
                    message: 'No AI bots found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Total AI bots retrieved successfully',
                data: totalBots
            });
        } catch (error) {
            console.error('Error retrieving total AI bots:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    async updateAIbot(req, res) {
        try {
            const botId = req.params.id;
            const updatedData = req.body;

            const updatedBot = await this.AIbotService.updateAIbot(botId, updatedData);

            if (!updatedBot) {
                return res.status(404).json({
                    success: false,
                    message: 'AI bot not found or update failed'
                });
            }

            res.status(200).json({
                success: true,
                message: 'AI bot updated successfully',
                data: updatedBot
            });
        } catch (error) {
            console.error('Error updating AI bot:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }


    async deleteAIbot(req, res) {
        try {
            const botId = req.query.id;

            if (!botId) {
                return res.status(400).json({
                    success: false,
                    message: 'Bot ID is required'
                });
            }

            const deleted = await this.AIbotService.deleteAIbot(botId);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'AI bot not found or deletion failed'
                });
            }

            res.status(200).json({
                success: true,
                message: 'AI bot deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting AI bot:', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }



}

export default AIbotController;