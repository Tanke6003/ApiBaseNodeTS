import { Response, Request } from "express";
import { UserServices } from '../../application/services/user.service';

export class UserController{

    public userServices:UserServices

    constructor(userServices:UserServices){
        this.userServices= userServices
    }

    getAllUsers = async(req: Request, res: Response) => {
        try {
            const users = await this.userServices.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }
    getUserById = async(req: Request, res: Response) =>{
        const userId = req.params.id;
    
        try {
            const user = await this.userServices.getUserByID(Number(userId));
    
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener el usuario por ID' });
        }
    }
    

}
