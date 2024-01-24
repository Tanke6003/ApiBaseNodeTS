import { Response,Request } from "express";
import { SequelizeConnection } from "../config/databases/sequelize-connection";
import { envs } from "../config/envs";

class UserController {


    constructor() {

    }
    initController(){
        
    }
    async getAllUsers(req: Request, res: Response) {
        try {

            const db =new SequelizeConnection({
                dialect: 'mariadb',
                host: envs.DB_HOST,
                port: envs.DB_PORT,
                username: envs.DB_USER,
                password: envs.DB_PASSWORD,
                database: envs.DB_NAME
            });
            const users = await db.executeQuery("SELECT * FROM users");
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }
}

export default UserController;