import { IJWTPlugin } from "../../dominio/interfaces/plugins/IAuthToken.interface";
import { JWTOptions } from "../../dominio/models/jwt.interfaces";
import jwt from "jsonwebtoken";
import { envs } from "./envs.plugin";
import { NextFunction,Request,Response } from "express";

export class JWT implements IJWTPlugin {
    constructor() {}

    CreateToken(options: JWTOptions): string {
        try {
            const token = jwt.sign(options, envs.JWT_SECRET, { expiresIn: envs.JWT_EXPIRED });
            return token;
        } catch (error: any) {
            throw new Error(`Error creating token: ${error.message}`);
        }
    }

    VerifyToken(token: string): boolean {
        try {
            const decoded = jwt.verify(token, envs.JWT_SECRET);
            if(decoded)
                return true;
            throw new Error("");    
        }
        catch(error:any){
            throw new Error(`Error executing query: ${error.message}`);

            return false;
        }
    }
    

    RefreshToken(): string {
        return "refreshedToken";
    }
    validateAccess = (req: Request, res: Response, next: NextFunction) =>  {
            const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized - Missing token' });
            }
    
            // Validate the token using your JWT plugin
            const isValidToken = this.VerifyToken(token);
    
            if (!isValidToken) {
                return res.status(401).json({ message: 'Unauthorized - Invalid token' });
            }
    
            // Token is valid, proceed to the next middleware or route handler
            next();
            return;
        };

    
}
