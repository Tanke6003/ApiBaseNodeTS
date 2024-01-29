import { IJWTPlugin } from "../../dominio/interfaces/IJWTPlugin.interfaces";
import { JWTOptions } from "../../dominio/models/jwt.interfaces";
import  jwt from "jsonwebtoken";
import { envs } from "./envs.plugin";
export class JWT implements IJWTPlugin {

    constructor() {
    }
    CreateToken(options:JWTOptions):string {
        try{
            const token = jwt.sign(options, envs.JWT_SECRET, { expiresIn: envs.JWT_EXPIRED });
            return token;
        }
        catch(error:any){
            throw new Error(`Error executing query: ${error.message}`);
        }
    }
    VerifyToken(token:string):boolean {
        try{
            const decoded = jwt.verify(token, envs.JWT_SECRET);
            
            return true;
        }
        catch(error:any){
            throw new Error(`Error executing query: ${error.message}`);
            return false;
        }
    }
    RerefreshToken():string {
        return "token";
    }


}