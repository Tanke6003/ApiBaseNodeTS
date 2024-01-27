import { UserRepository } from '../../infrastructure/user.repository';
import { UserDTO } from '../DTOs/user.DTO.interface';
import { User } from '../../dominio/models/user.interface';


export class UserServices{
    
    private userRepository:UserRepository
    constructor(userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async getAllUsers():Promise<Array<UserDTO>>{
        try {
    
            const users:User[] = await this.userRepository.getAllUsers();
            return this.mapUsers(users);
        } catch (error:any) {
            console.error(error);
            throw new Error(`Error executing query: ${error.message}`);
            return [];
        }

    }
    async getUserByID(id:number):Promise<UserDTO|null>{
        let user:User;
        try {
    
            user = await this.userRepository.getUserById(id);
            return user;
        } catch (error) {
            console.error(error);
            return null ;
        }

    }
    async createUser(user:User):Promise<boolean>{
        let result = false;
        try {
    
            result = await this.userRepository.createUser(user);
            return result
        } catch (error) {
            console.error(error);
            return false ;
        }
    }

    mapUsers(users:User[]):UserDTO[]{

        const usersDTO = users.map((user)=>{
            const  userDto:UserDTO = {id:user.id,name:user.name};
            return userDto;
        });

        return usersDTO;
    }

}