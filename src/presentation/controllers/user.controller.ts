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
    // async getUserById(req: Request, res: Response) {
    //     const userId = req.params.id;
    
    //     try {
    //         const user = await db.executeQuery("SELECT * FROM users WHERE id = ?;",[userId]);
    
    //         if (user.length > 0) {
    //             res.json(user[0]);
    //         } else {
    //             res.status(404).json({ error: 'Usuario no encontrado' });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: 'Error al obtener el usuario por ID' });
    //     }
    // }
    

}
