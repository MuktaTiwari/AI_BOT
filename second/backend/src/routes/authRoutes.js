import { Router } from 'express';
import AuthController from '../controller/AuthController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

class AuthRoutes {
    router = Router();
    authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(`/signup`,  this.authController.Signup.bind(this.authController));
        this.router.post(`/login`, this.authController.Login.bind(this.authController));

        this.router.get('/user', this.authController.getAllUsers.bind(this.authController));
        
    }
}

export default AuthRoutes;