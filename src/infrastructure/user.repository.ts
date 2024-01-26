import { user } from '../dominio/models/user.interface';
import { IDBConnection } from "../dominio/interfaces/IDBConnection.interface";

export class UserRepository {
    db: IDBConnection;

    constructor(cn: IDBConnection) {
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
    async getUserByID(id:number):Promise<user>{
        const userData = await this.db.executeQuery("SELECT * FROM users WHERE id = ?;",[id]);
        const user: user = userData[0] as user;
        return user;
    }
}
