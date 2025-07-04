// src/service/AuthService.js
import UserModel from "../models/UserModel.js";

class AuthService {
    async Signup(userData) {
        try {
            // Check if user already exists
            const existingUser = await UserModel.findOne({ 
                where: { email: userData.email } 
            });
            
            if (existingUser) {
                throw new Error('User already exists');
            }

            // Create new user
            const newUser = await UserModel.create(userData);
            return newUser;
        } catch (error) {
            throw new Error('Error during signup: ' + error.message);
        }
    }
}

export default AuthService;