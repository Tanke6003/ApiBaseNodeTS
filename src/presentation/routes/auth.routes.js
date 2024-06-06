"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
class AuthModule {
    constructor(router) {
        this.router = (0, express_1.Router)();
        this.router = router;
        this.setRoutes();
    }
    setRoutes() {
        const authController = new auth_controller_1.AuthController();
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
exports.AuthModule = AuthModule;
