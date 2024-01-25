import { Router } from 'express';
import { SequelizeConnection } from '../../config/databases/sequelize-connection';
import { envs } from '../../config/envs';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../../infrastructure/user.repository';
import { UserServices } from '../../application/services/user.service';

class UserModule {
  private router:Router
  private userRepository!: UserRepository 
  private userServices!: UserServices
  private userController!: UserController 

  constructor(router:Router) {
    this.router = router;
    this.initializeDependencies();
    this.setRoutes()
  }

  private initializeDependencies() {
    const db = new SequelizeConnection({
      dialect: 'mariadb',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USER,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME
    });
    this.userRepository = new UserRepository(db);
    this.userServices = new UserServices(this.userRepository);
    this.userController = new UserController(this.userServices);
}
  getRoutes() {
    return this.router;
  }
  setRoutes(){
    this.router.get('/users',this.userController.getAllUsers);
  }
}

export { UserModule  };
