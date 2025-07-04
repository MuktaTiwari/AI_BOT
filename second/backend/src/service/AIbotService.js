import AIbotModel from '../models/AIbotModel.js';

class AIbotService {
    async createAIbot(data) {
        try {
            const botData = {
                botName: data.botName,
                messages: data.messages,
                userId: data.userId
            };
            const newAIbot = await AIbotModel.create(botData);
            return newAIbot;
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error creating AI bot: ' + error.message);
        }
    }
}

export default AIbotService;