import { IDBConnection } from "../../dominio/interfaces/IDBConnection.interface";
import { IUsersDataSource } from "../../dominio/interfaces/IUserDataSource.interface";
import { User } from "../../dominio/models/user.interface";



export class UserMSSQLDataSource implements IUsersDataSource {
  private db: IDBConnection;
    constructor(db: IDBConnection) {
        this.db = db;
    }
    async getAllUsers() {
        const query = 'SELECT * FROM users';
        const users = await this.db.executeQuery(query);
        return users;
    }
    async getUserById(id: number) {
        const query = 'SELECT * FROM users WHERE id = ?';
        const user = await this.db.executeQuery(query, [id]);
        return user;
    }
    async createUser(user:User) {
        const query = 'INSERT INTO users (name) VALUES (?)';
        const result = await this.db.executeQuery(query, [user.name]);
        return result;
    }
     async updateUser(user: User): Promise<User | null> {
        throw new Error("method not implemented")
    }
}

