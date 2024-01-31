import { IDBConnection } from "../../dominio/interfaces/IDBConnection.interface";
import { IUsersDataSource } from "../../dominio/interfaces/IUserDataSource.interface";
import { User } from "../../dominio/models/user.interface";

export class UserMariaDBDataSource implements IUsersDataSource {
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
        try{
            const query = 'SELECT * FROM users WHERE userId = ?';
            let result = await this.db.executeQuery(query, [id]);
            if (result.length>0)
                return result[0];
            throw new Error("User not found");
        }
        catch(error)
        {
            console.log(error)
        }

    }
    async createUser(user:User) {
        const query = 'INSERT INTO users (name,email,password,birthDate) VALUES (?,?,?,?)';
        const result = await this.db.executeQuery(query, [user.name,user.email,user.password,user.birthDate]);
        return result;
    }
    async updateUser(user:User) {
        const query = 'UPDATE users SET name = ? WHERE id = ?';
        const result = await this.db.executeQuery(query, [user.name, user.userId]);
        return result;
    }
}

