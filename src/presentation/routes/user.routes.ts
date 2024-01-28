import { Router } from "express";
import { envs } from "../../infrastructure/plugins/envs.plugin";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { UserServices } from "../../application/services/user.service";
import { UserMariaDBDataSource } from "../../infrastructure/datasources/user.mariadb.datasource";
import { IUsersDataSource } from "../../dominio/interfaces/IUserDataSource.interface";
import { SequelizeConnection } from "../../infrastructure/plugins/sequelize.plugin";

class UserModule {
  private router: Router;
  private userRepository: UserRepository;
  private userServices: UserServices;
  private userController: UserController;

  constructor(router: Router) {
    this.router = router;
    const datasources: IUsersDataSource[] = [];
    const dbmariadb = new SequelizeConnection({
      dialect: "mariadb",
      host: envs.DB_HOST,
      port: envs.DB_PORT,
      username: envs.DB_USER,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
    });
    // const dbmssql = new SequelizeConnection({
    //   dialect: 'mssql',
    //   host: envs.MSSQL_HOST,
    //   port: envs.MSSQL_PORT,
    //   username: envs.MSSQL_USER,
    //   password: envs.MSSQL_PASSWORD,
    //   database: envs.DB_NAME
    // });
    const userDataSource = new UserMariaDBDataSource(dbmariadb);
    this.userRepository = new UserRepository(userDataSource);
    this.userServices = new UserServices(this.userRepository);
    this.userController = new UserController(this.userServices);
    this.setRoutes();
  }
  getRoutes() {
    return this.router;
  }
  setRoutes() {
    /**
     * @swagger
     * /users:
     *   get:
     *     description: Get all users
     *     responses:
     *       200:
     *         description: Successful response
     */
    this.router.get("/users", this.userController.getAllUsers);
    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     description: Get user by id
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: id of user
     *         schema:
     *           type: integer
     *           format: int64
     *     responses:
     *       200:
     *         description: Successful response
     */
    this.router.get("/users/:id", this.userController.getUserById);
    /**
     * @swagger
     * /users/create-user:
     *   post:
     *     description: Create user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Name of the user
     *                 example: 'John'
     *               id:
     *                 type: integer
     *                 description: ID of the user
     *                 example: 1
     *     responses:
     *       200:
     *         description: Successful response
     */

    this.router.post("/users/create-user", this.userController.createUser);
    /**
     * @swagger
     * /users/update-user:
     *   put:
     *     description: Update user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: Name of the user
     *                 example: 'John'
     *               id:
     *                 type: integer
     *                 description: ID of the user
     *                 example: 1
     *     responses:
     *       200:
     *         description: Successful response
     */
    this.router.put("/users/update-user", this.userController.updateUser);
  }
}

export { UserModule };
