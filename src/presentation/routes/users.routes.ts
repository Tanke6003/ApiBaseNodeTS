  import { Router } from "express";
import { envs } from "../../application/plugins/envs.plugin";
import { UsersController } from "../controllers/users.controller";
import { UsersRepository } from "../../infrastructure/repositories/users/users.repository";
import { UserServices } from "../../application/services/users.service";
import { UserMariaDBDataSource } from "../../infrastructure/datasources/users.mariadb.datasource";
import { SequelizeConnection } from "../../application/plugins/sequelize.plugin";
import { IJWTPlugin } from "../../dominio/interfaces/plugins/IAuthToken.interface";
import { JWT } from "../../application/plugins/jwt.plugin";


class UserModule {
  private router: Router;
  private usersController: UsersController;
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
    const userDataSource = new UserMariaDBDataSource(dbmariadb);
    const userRepository = new UsersRepository(userDataSource);
    const  userServices = new UserServices(userRepository);
    this.usersController = new UsersController(userServices);
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
    this.router.get("/users", this.usersController.getAllUsers);
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
    this.router.get("/users/:id", this.usersController.getUserById);
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

    this.router.post("/users/create-user", this.usersController.createUser);
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
   this.router.put("/users/update-user", this.jwtMiddleware.validateAccess, this.usersController.updateUser);


  }
}

export { UserModule };
