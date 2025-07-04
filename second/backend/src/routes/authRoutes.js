import { Router } from 'express';
import AuthController from '../controller/AuthController.js';
class AuthRoutes{
  router = Router();
  authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

initializeRoutes() {
    this.router.post(`/signup`, this.authController.Signup.bind(this.authController));

  }
}

export default AuthRoutes;