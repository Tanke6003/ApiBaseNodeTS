  import { Router } from "express";
import { envs } from "../../application/plugins/envs.plugin";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { UserServices } from "../../application/services/user.service";
import { UserMariaDBDataSource } from "../../infrastructure/datasources/user.mariadb.datasource";
import { SequelizeConnection } from "../../application/plugins/sequelize.plugin";
import { IJWTPlugin } from "../../dominio/interfaces/IJWTPlugin.interfaces";
import { JWT } from "../../application/plugins/jwt.plugin";


class UserModule {
  private router: Router;
  private userController: UserController;
  private jwtMiddleware : IJWTPlugin;
  constructor(router: Router) {
    this.router = router;
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
    const userRepository = new UserRepository(userDataSource);
    const  userServices = new UserServices(userRepository);
    this.userController = new UserController(userServices);
    this.jwtMiddleware = new JWT();
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
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Successful response
     *  
     *
     */
    this.router.get("/users", this.userController.getAllUsers);
    /**
     * @swagger
     * /users/{id}:
     *   get:
     *     description: Get user by id
     *     tags: [Users]
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
     *       404:
     *          description: User Not Found
     */
    this.router.get("/users/:id", this.userController.getUserById);
    /**
     * @swagger
     * /users/create-user:
     *   post:
     *     description: Create user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserDTO'
     *     responses:
     *       200:
     *         description: Successful response
     */

    this.router.post("/users/create-user", this.userController.createUser);
    /**
     * @swagger
     * /users/update-user:
     *   put:
     *     security:
     *       - bearerAuth: []
     *     description: Update user information
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserDTO'
     *     responses:
     *       200:
     *         description: Successful response
     */
   this.router.put("/users/update-user", this.jwtMiddleware.validateAccess, this.userController.updateUser);


  }
}

export { UserModule };
