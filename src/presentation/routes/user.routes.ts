import { Router } from 'express';
import { envs } from '../../infrastructure/plugins/envs.plugin';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserServices } from '../../application/services/user.service';
import { UserMariaDBDataSource } from '../../infrastructure/datasources/user.mariadb.datasource';
import { IUsersDataSource } from '../../dominio/interfaces/IUserDataSource.interface';
import { UserMSSQLDataSource } from '../../infrastructure/datasources/user.mssql.datasource';
import { SequelizeConnection } from '../../infrastructure/plugins/sequelize.connection';

class UserModule {
  private router:Router
  private userRepository: UserRepository 
  private userServices: UserServices
  private userController: UserController 

  constructor(router:Router) {
    this.router = router;
    const datasources:IUsersDataSource[] = [];
    const dbmariadb = new SequelizeConnection({
      dialect: 'mariadb',
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USER,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME
    });
    const dbmssql = new SequelizeConnection({
      dialect: 'mssql',
      host: envs.MSSQL_HOST,
      port: envs.MSSQL_PORT,
      username: envs.MSSQL_USER,
      password: envs.MSSQL_PASSWORD,
      database: envs.DB_NAME
    });
    const userDataSource = new UserMariaDBDataSource(dbmariadb);
    //const userDataSource2 = new UserMSSQLDataSource(dbmssql);
    datasources.push(userDataSource);
    //datasources.push(userDataSource2);
    this.userRepository = new UserRepository(datasources);
    this.userServices = new UserServices(this.userRepository);
    this.userController = new UserController(this.userServices);
    this.setRoutes()
  }
  getRoutes() {
    return this.router;
  }
  setRoutes(){
    this.router.get('/users', this.userController.getAllUsers);
    this.router.get('/users/:id',this.userController.getUserById);
    this.router.post('/users/create-user',this.userController.createUser);
  }
}

export { UserModule  };
