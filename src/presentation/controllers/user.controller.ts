import { Response, Request } from "express";
import { UserServices } from '../../application/services/user.service';
import { UserDTO } from "../../application/dtos/user.dto.interface";

export class UserController{

    public userServices:UserServices

    constructor(userServices:UserServices){
        this.userServices= userServices
    }

    getAllUsers = async(req: Request, res: Response) => {
        try {
            const users:UserDTO[] = await this.userServices.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
        }
    }
    getUserById = async(req: Request, res: Response) =>{
        const userId:number = Number(req.params.id);
    
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
    createUser = async(req: Request, res: Response) =>{
        const bodyreq:UserDTO = req.body;
        try {
            const result = await this.userServices.createUser(bodyreq)
            if(!result)
                throw new Error("No se pudo registrar al usuario")
            return res.status(200).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error});
        }
    }
    updateUser = async(req: Request, res: Response) =>{
        const bodyreq:UserDTO = req.body;
        try {
            const result = await this.userServices.updateUser(bodyreq)
            if(!result)
                throw new Error("No se pudo actualizar al usuario")
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error});
        }
    }
    

}
