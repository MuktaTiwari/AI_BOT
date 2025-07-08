import AuthService from "../service/AuthService.js";

class AuthController {
    authService = new AuthService();

    async Signup(req, res) {
        try {
            const userData = req.body;
            const registerData = await this.authService.Signup(userData);

            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: registerData
            });

        } catch (error) {
            console.error('Error during signup:', error);

            if (error.message.includes('User already exists')) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already registered'
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Registration failed',
                error: error.message
            });
        }
    }

    async Login(req, res) {
        try {
            const userData = req.body;
            const { user, token } = await this.authService.Login(userData);

            if (!user || !token) {
                throw new Error('Invalid user data received from service');
            }

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                token
            });
        } catch (error) {
            console.error('Detailed login error:', {
                message: error.message,
                stack: error.stack,
                originalError: error.original // For Sequelize errors
            });

            if (error.message.includes('Invalid credentials')) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            return res.status(500).json({
                success: false,
                message: 'Login failed',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }


    async getAllUsers(req, res) {
    try {
        const users = await this.authService.getAllUsers();
        return res.status(200).json({
            success: true,
            data: users,
            message: 'Users retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
}
}

export default AuthController;