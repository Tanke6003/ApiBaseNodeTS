// index.ts

import { Router } from "express";
import { UserModule } from "./user.routes";
import { AuthModule } from "./auth.routes";

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
  }
  getRoutes() {
    return this.routes;
  }
}

export { RouterModule };
