import { UserRepository } from '../../infrastructure/user.repository';
import { userDTO } from '../DTOs/user.DTO.interface';
import { user } from '../../dominio/models/user.interface';


export class UserServices{
    
    userRepository:UserRepository
    constructor(userRepository:UserRepository){
        this.userRepository = userRepository
    }

    async getAllUsers():Promise<Array<userDTO>>{
        try {
    
            const users:user[] = await this.userRepository.getAllUsers();
            return this.mapUsers(users);
        } catch (error) {
            console.error(error);
            return [];
        }

    }
    async getUserByID(id:number):Promise<userDTO|null>{
        let user:user;
        try {
    
            user = await this.userRepository.getUserByID(id);
            return user;
        } catch (error) {
            console.error(error);
            return null ;
        }

    }

    mapUsers(users:user[]):userDTO[]{

        const usersDTO = users.map((user)=>{
            const  userDto:userDTO = {id:user.id,name:user.name};
            return userDto;
        });

        return usersDTO;
    }

}