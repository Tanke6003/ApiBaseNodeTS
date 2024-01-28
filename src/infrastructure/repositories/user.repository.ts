import { User } from '../../dominio/models/user.interface';
import { IDBConnection } from "../../dominio/interfaces/IDBConnection.interface";
import { IUsersDataSource } from '../../dominio/interfaces/IUserDataSource.interface';

export class UserRepository {
    private datasources: IUsersDataSource[] = [];

    constructor(datasources: IUsersDataSource[]) {
        this.datasources = datasources;
    }

    async getAllUsers(): Promise<User[]> {
        const users: User[] = [];
        let firstUsers: User[] | undefined;
        for (const datasource of this.datasources) {
            const currentUsers = await datasource.getAllUsers();
            if (firstUsers === undefined) {
                firstUsers = currentUsers;
            } else {
                if (!this.areUsersEqual(firstUsers, currentUsers)) {
                    throw new Error('Los orígenes de datos no proporcionan la misma información de usuarios.');
                }
            }
            users.push(...currentUsers);
        }
        return users;
    }
    async getUserById(id: number): Promise<User> {
        const users: User[] = [];
        let firstUser: User | undefined;
    
        // Obtener usuario de cada fuente de datos y compararlos
        for (const datasource of this.datasources) {
            const currentUser = await datasource.getUserById(id);
    
            if (firstUser === undefined) {
                firstUser = currentUser;
            } else {
                if (!this.areIndividualUsersEqual(firstUser, currentUser)) {
                    throw new Error('Los orígenes de datos no proporcionan la misma información para el usuario con ID ' + id);
                }
            }
            users.push(currentUser);
        }
        return users[0];
    }
    async createUser(user:User): Promise<boolean> {
        try {
            // Crear usuario en cada fuente de datos
            for (const datasource of this.datasources) {
                await datasource.createUser(user);
            }
    
            return true;
        } catch (ex) {
            console.error(ex);
            return false;
        }
    }
    areUsersEqual(usersA: User[], usersB: User[]): boolean {
        if (usersA.length !== usersB.length) {
            return false;
        }
        for (const userA of usersA) {
            if (!usersB.some(userB => this.areIndividualUsersEqual(userA, userB))) {
                return false;
            }
        }
    
        return true;
    }
    
    areIndividualUsersEqual(userA: User, userB: User): boolean {

        return userA.id === userB.id;
    }
}
