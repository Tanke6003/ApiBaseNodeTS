import { Router } from 'express';
import { MariaDBConnection } from '../../infrastructure/datasources/mariadb.connection';
import { envs } from '../../infrastructure/config/envs';
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
    // const db = new MariaDBConnection({
    //   dialect: 'mariadb',
    //   host: envs.DB_HOST,
    //   port: envs.DB_PORT,
    //   username: envs.DB_USER,
    //   password: envs.DB_PASSWORD,
    //   database: envs.DB_NAME
    // });
    const db = new MariaDBConnection({
      dialect: 'mssql',
      host: "127.0.0.1",
      port: 1433,
      username: "sa",
      password: "SECRETPASS1!",
      database: "test"
    });
    this.userRepository = new UserRepository(db);
    this.userServices = new UserServices(this.userRepository);
    this.userController = new UserController(this.userServices);
}
  getRoutes() {
    return this.router;
  }
  setRoutes(){
    this.router.get('/users', this.userController.getAllUsers);
    this.router.get('/users/:id',this.userController.getUserById);
    this.router.post('/users',this.userController.createUser);
  }
}

export { UserModule  };
