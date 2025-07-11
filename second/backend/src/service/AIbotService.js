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


    async getAIbotList(userId) {
        try {
            const bots = await AIbotModel.findAll({
                where: { userId: userId }
            });
            return bots;
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error retrieving AI bots: ' + error.message);
        }
    }

    async getAllAIBot(){
        try{

            const bots = await AIbotModel.findAll();

            return bots;
        }
         catch (error) {
            console.error('Database error:', error);
            throw new Error('Error retrieving AI bots: ' + error.message);
        }
    }

    async getTotalBots() {
        try {
            const totalBots = await AIbotModel.count();
            return totalBots;
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error retrieving total bots: ' + error.message);
        }
    }


    async updateAIbot(id, data) {
        try {
            const [updated] = await AIbotModel.update(data, {
                where: { id: id }
            });

            if (updated) {
                const updatedAIbot = await AIbotModel.findOne({ where: { id: id } });
                return updatedAIbot;
            }
            throw new Error('AI bot not found');
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error updating AI bot: ' + error.message);
        }
    }


    async deleteAIbot(id) {
        try {
            const deleted = await AIbotModel.destroy({
                where: { id: id }
            });

            if (deleted) {
                return { message: 'AI bot deleted successfully' };
            }
            throw new Error('AI bot not found');
        } catch (error) {
            console.error('Database error:', error);
            throw new Error('Error deleting AI bot: ' + error.message);
        }
    }
}

export default AIbotService;