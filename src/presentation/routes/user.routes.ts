import { Router } from 'express';
import { MariaDBConnection } from '../../infrastructure/config/mariadb.connection';
import { envs } from '../../infrastructure/config/envs';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../../infrastructure/user.repository';
import { UserServices } from '../../application/services/user.service';
import { UserMariaDBDataSource } from '../../infrastructure/datasources/user.mariadb.datasource';
import { IUsersDataSource } from '../../dominio/interfaces/IUserDataSource.interface';
import { UserMSSQLDataSource } from '../../infrastructure/datasources/user.mssql.datasource copy';
import { MsSQLConnection } from '../../infrastructure/config/mssql.connection';

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
    const datasources:IUsersDataSource[] = [];
    const dbmariadb = new MariaDBConnection({
      dialect: 'mariadb',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USER,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME
    });
    const dbmssql = new MsSQLConnection({
      dialect: 'mssql',
      host: "127.0.0.1",
      port: 1434,
      username: "sa",
      password: "EnGswUs3r19!",
      database: "test"
    });
    const userDataSource = new UserMariaDBDataSource(dbmariadb);
    const userDataSource2 = new UserMSSQLDataSource(dbmssql);
    datasources.push(userDataSource);
    datasources.push(userDataSource2);
    this.userRepository = new UserRepository(datasources);
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
