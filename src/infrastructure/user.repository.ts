import { User } from '../dominio/models/user.interface';
import { IDBConnection } from "../dominio/interfaces/IDBConnection.interface";

export class UserRepository {
    private db: IDBConnection;

    constructor(cn: IDBConnection) {
        this.db = cn;
    }

    async getAllUsers(): Promise<User[]> {
        const userData = await this.db.executeQuery("SELECT * FROM users;");
        const users: User[] = userData.map((data: any) => {
            return {
                id: data.id,
                name:data.name
            };
        });
        return users;
    }
    async getUserByID(id:number):Promise<User>{
        const userData = await this.db.executeQuery("SELECT * FROM users WHERE id = ?;",[id]);
        const user: User = userData[0] as User;
        return user;
    }
    async createUser(name:string):Promise<boolean>{
        try{
            await this.db.executeQuery("INSERT INTO users(name)VALUES(?)",[name])
            return true;
        }
        catch(ex)
        {
            console.error(ex)
            return false;
        }
    }
}
