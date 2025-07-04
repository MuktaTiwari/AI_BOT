
import AIbotService from '../service/AIbotService.js';
class AIbotController {

    AIbotService = new AIbotService;

    async createAIbot(req, res) {
        try {
            const aiData = req.body;
            const data = await this.AIbotService.createAIbot(aiData);
            if (!data) {
                return res.status(400).json({ message: 'Failed to create AI bot' });
            }
            res.status(201).json({ message: 'AI bot created successfully', data: data });
        } catch (error) {
            console.error('Error creating AI bot:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default AIbotController