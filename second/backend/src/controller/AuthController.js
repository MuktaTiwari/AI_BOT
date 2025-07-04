import AuthService from "../service/AuthService.js";

class AuthController {
    authService = new AuthService();

    async Signup(req, res) {
        try {
            const userData = req.body;
            const registerData = await this.authService.Signup(userData);
            
            // Return success response with the created user data
            return res.status(201).json({ 
                success: true,
                message: 'User registered successfully',
                data: registerData 
            });
            
        } catch (error) {
            console.error('Error during signup:', error);
            
            // Handle specific error cases
            if (error.message.includes('User already exists')) {
                return res.status(409).json({ 
                    success: false,
                    message: 'Email already registered' 
                });
            }
            
            // Generic error response
            return res.status(500).json({ 
                success: false,
                message: 'Registration failed',
                error: error.message 
            });
        }
    }
}

export default AuthController;