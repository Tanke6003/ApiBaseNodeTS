// index.ts

import { Router } from "express";
import { UserModule } from "./users.routes";
import { AuthModule } from "./auth.routes";
import { LogsRoutes } from "./logs.routes";

class RouterModule {
  router: Router = Router();
  routes: Router[] = [];

  constructor() {
    this.setRoutes();
  }
  setRoutes() {
    /**
     * @swagger
     * tags:
     *   name: Users
     *   description: Operaciones relacionadas con usuarios
     */
    const userModule = new UserModule(this.router);
    this.routes.push(userModule.getRoutes());
    /**
     * @swagger
     * tags:
     *   name: Auth
     *   description: Operaciones relacionadas con la autenticación
     */
    const authModule = new AuthModule(this.router);
    this.routes.push(authModule.getRoutes());
    const logsModule = new LogsRoutes(this.router);
    this.routes.push(logsModule.getRouter());
  }
  getRoutes() {
    return this.routes;
  }
}

export { RouterModule };
