"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const envs_plugin_1 = require("../../application/plugins/envs.plugin");
const user_controller_1 = require("../controllers/user.controller");
const user_repository_1 = require("../../infrastructure/repositories/user.repository");
const user_service_1 = require("../../application/services/user.service");
const user_mariadb_datasource_1 = require("../../infrastructure/datasources/user.mariadb.datasource");
const sequelize_plugin_1 = require("../../application/plugins/sequelize.plugin");
const jwt_plugin_1 = require("../../application/plugins/jwt.plugin");
class UserModule {
    constructor(router) {
        this.router = router;
        const dbmariadb = new sequelize_plugin_1.SequelizeConnection({
            dialect: "mariadb",
            host: envs_plugin_1.envs.DB_HOST,
            port: envs_plugin_1.envs.DB_PORT,
            username: envs_plugin_1.envs.DB_USER,
            password: envs_plugin_1.envs.DB_PASSWORD,
            database: envs_plugin_1.envs.DB_NAME,
        });
        // const dbmssql = new SequelizeConnection({
        //   dialect: 'mssql',
        //   host: envs.MSSQL_HOST,
        //   port: envs.MSSQL_PORT,
        //   username: envs.MSSQL_USER,
        //   password: envs.MSSQL_PASSWORD,
        //   database: envs.DB_NAME
        // });
        const userDataSource = new user_mariadb_datasource_1.UserMariaDBDataSource(dbmariadb);
        const userRepository = new user_repository_1.UserRepository(userDataSource);
        const userServices = new user_service_1.UserServices(userRepository);
        this.userController = new user_controller_1.UserController(userServices);
        this.jwtMiddleware = new jwt_plugin_1.JWT();
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
exports.UserModule = UserModule;
