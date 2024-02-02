
import { JWT } from '../../application/plugins/jwt.plugin';
import { Request, Response } from 'express';

export class AuthController{

    constructor(){

    }
    login = async (_req: Request, res: Response) => {
        const jwt = new JWT();
        const token = jwt.CreateToken({id: 1, email: "test"});
       return res.status(200).json(token);
    }
}