import { User } from '../../../dominio/models/user.interface';
import { IUsersDataSource } from '../../../dominio/interfaces/IUserDataSource.interface';

export class UsersRepository {

    private datasource: IUsersDataSource;

    constructor(datasource: IUsersDataSource) {
        this.datasource = datasource;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.datasource.getAllUsers();
    }
    async getUserById(id: number): Promise<User> {

        return await this.datasource.getUserById(id);
    }
    async createUser(user:User): Promise<boolean> {
        try {
                await this.datasource.createUser(user);
    
            return true;
        } catch (ex) {
            console.error(ex);
            return false;
        }
    }
    async updateUser(user: User): Promise<User|null> {
        try {
                await this.datasource.updateUser(user);
            return user;
        } catch (ex) {
            console.error(ex);
            return null;
        }
    }

    
}
