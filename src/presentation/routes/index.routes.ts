// index.ts

import { Router } from 'express';
import { UserModule } from './user.routes';


class RouterModule{
  router:Router = Router();
  routes:Router[]= [];

  constructor(){
    this.setRoutes();
  }
  setRoutes(){
  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: Operaciones relacionadas con usuarios
   */
    const userModule = new UserModule(this.router);
    this.routes.push(userModule.getRoutes());

  }
  getRoutes(){
    return this.routes
  }
}


export { RouterModule};
