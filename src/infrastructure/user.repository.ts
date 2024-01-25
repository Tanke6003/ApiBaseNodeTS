import { SequelizeConnection } from "../config/databases/sequelize-connection";
import { user } from "../dominio/models/user.interface";

export class UserRepository {
    db: SequelizeConnection;

    constructor(cn: SequelizeConnection) {
        this.db = cn;
    }

    async getAllUsers(): Promise<user[]> {
        const userData = await this.db.executeQuery("SELECT * FROM users;");
        const users: user[] = userData.map((data: any) => {
            return {
                id: data.id,
                name:data.name
            };
        });
        return users;
    }
}
