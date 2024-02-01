import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";


export class AuthModule {
    router: Router = Router();
    
    constructor(router:Router) {
        this.router = router;
        this.setRoutes();
    }
    setRoutes() {
        const authController = new AuthController();
        /**
         * @swagger
         * /auth/login:
         *  get:
         *    description: Get all users
         *    tags: [Auth]
         *    responses:
         *      200:
         *        description: Successful response
            */
        this.router.get('/auth/login', authController.login);
    }
    getRoutes() {
        return this.router;
    }
}