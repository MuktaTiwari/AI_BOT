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
}

export default AIbotController;