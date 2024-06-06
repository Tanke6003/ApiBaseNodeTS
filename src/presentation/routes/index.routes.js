"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterModule = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user.routes");
const auth_routes_1 = require("./auth.routes");
class RouterModule {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes = [];
        this.setRoutes();
    }
    setRoutes() {
        /**
         * @swagger
         * tags:
         *   name: Users
         *   description: Operaciones relacionadas con usuarios
         */
        const userModule = new user_routes_1.UserModule(this.router);
        this.routes.push(userModule.getRoutes());
        /**
         * @swagger
         * tags:
         *   name: Auth
         *   description: Operaciones relacionadas con la autenticación
         */
        const authModule = new auth_routes_1.AuthModule(this.router);
        this.routes.push(authModule.getRoutes());
    }
    getRoutes() {
        return this.routes;
    }
}
exports.RouterModule = RouterModule;
