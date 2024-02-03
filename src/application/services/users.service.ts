import { UsersRepository } from '../../infrastructure/repositories/users/users.repository';
import { UserDTO } from '../dtos/users.dto.interface';
import { User } from '../../dominio/models/user.interface';


export class UserServices{

    
    private userRepository:UsersRepository
    constructor(userRepository:UsersRepository){
        this.userRepository = userRepository
    }

    async getAllUsers():Promise<Array<UserDTO>>{
        try {
    
            const users:User[] = await this.userRepository.getAllUsers();
            return this.mapUsersToUserDTOs(users);
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
            if(user == null)
                throw new Error("No se encontro al usuario")
            let UserDTO = this.mapUserToUserDTO(user);

            return UserDTO;
        } catch (error) {
            console.error(error);
            return null ;
        }

    }
    async createUser(userReq:UserDTO):Promise<boolean>{
        let result = false;
        try {
            let user = this.mapUserDTOToUser(userReq);
            result = await this.userRepository.createUser(user);
            return result
        } catch (error) {
            console.error(error);
            return false ;
        }
    }
    async updateUser(userReq: UserDTO):Promise<UserDTO|null>{
        try {
            let user = this.mapUserDTOToUser(userReq);
            let result = await this.userRepository.updateUser(user);
            if(result == null)
                throw new Error("No se pudo actualizar al usuario")
            let userDto:UserDTO = this.mapUserToUserDTO(result);
            return userDto;
        } catch (error) {
            console.error(error);
            return null ;
        }
        
    }

    mapUsersToUserDTOs(users:User[]):UserDTO[]{

        const usersDTO = users.map((user)=>{
            const  userDto:UserDTO = {id:user.userId,firstName:user.name,lastName:user.name,nickName:user.name,email:user.email,password:user.password,birthDate:user.birthDate,available:user.available};
            return userDto;
        });

        return usersDTO;
    }
    mapUserToUserDTO(user:User):UserDTO{
        const  userDto:UserDTO = {id:user.userId,firstName:user.name,lastName:user.name,nickName:user.name,email:user.email,password:user.password,birthDate:user.birthDate,available:user.available};
        return userDto;
    }
    mapUserDTOsToUsers(usersDTO:UserDTO[]):User[]{
        const users = usersDTO.map((userDto)=>{
            const  user:User = {userId:userDto.id,name:userDto.firstName,email:userDto.email,password:userDto.password,birthDate:userDto.birthDate,available:userDto.available};
            return user;
        });

        return users;
    }
    
    mapUserDTOToUser(userDto:UserDTO):User{
        const  user:User = {userId:userDto.id,name:userDto.firstName,email:userDto.email,password:userDto.password,birthDate:userDto.birthDate,available : userDto.available};
        return user;
    }


}