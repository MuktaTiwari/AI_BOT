
import AIbotModel from '../models/AIbotModel.js';


class AIbotService{
    AIbotModel = new AIbotModel;


    async createAIbot(data) {
        try {
            const newAIbot = await this.AIbotModel.create(data);
            return newAIbot;
        } catch (error) {
            throw new Error('Error creating AI bot: ' + error.message);
        }
    }
}

export default AIbotService;