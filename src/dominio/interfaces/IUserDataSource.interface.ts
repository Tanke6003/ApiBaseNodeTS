import { UserDTO } from "../../application/dtos/user.dto.interface";
import { User } from "../models/user.interface";

export interface IUsersDataSource {
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(user: User): Promise<User>;
    updateUser(user: User): Promise<User|null>;
    }