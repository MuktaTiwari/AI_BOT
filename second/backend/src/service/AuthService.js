import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from "../models/UserModel.js";

class AuthService {
    async Signup(userData) {
        try {
            const existingUser = await UserModel.findOne({
                where: { email: userData.email }
            });

            if (existingUser) {
                throw new Error('User already exists');
            }

            // Hash password before saving
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = await UserModel.create({
                ...userData,
                userType: userData.userType || 'user',
                password: hashedPassword
            });

            return newUser;
        } catch (error) {
            throw new Error('Error during signup: ' + error.message);
        }
    }

    async Login(userData) {
        try {
            if (!userData.email || !userData.password) {
                throw new Error('Email and password are required');
            }

            const user = await UserModel.findOne({
                where: { email: userData.email }
            });

            if (!user) {
                throw new Error('Invalid credentials');
            }

            const isPasswordValid = await bcrypt.compare(
                userData.password,
                user.password
            );

            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
            );

            // Ensure all required fields are included
            const userResponse = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                // Add other fields you need
            };

            return {
                user: userResponse,
                token
            };
        } catch (error) {
            console.error('AuthService login error:', error);
            throw new Error(error.message);
        }
    }


    async getAllUsers() {
        try {
            const users = await UserModel.findAll({
                attributes: ['id', 'firstName', 'lastName', 'email', 'mobileNo', 'userType']
            });

            // Return as an array of user objects
            return users.map(user => user.get({ plain: true }));
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Error fetching users: ' + error.message);
        }
    }
}

export default AuthService;