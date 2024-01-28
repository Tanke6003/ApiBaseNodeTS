import { IJWTPlugin } from "../../dominio/interfaces/IJWTPlugin.interfaces";
import { JWTOptions } from "../../dominio/models/jwt.interfaces";
import  jwt from "jsonwebtoken";
import { envs } from "./envs.plugin";
export class JWTPlugin implements IJWTPlugin {

    constructor() {
    }
    CreateToken(options:JWTOptions) {
        try{
            const token = jwt.sign(options, envs.JWT_SECRET, { expiresIn: envs.JWT_EXPIRES });
            return token;
        }
        catch(error:any){
            throw new Error(`Error executing query: ${error.message}`);
        }
    }
    VerifyToken(token:string) {
        try{
            const decoded = jwt.verify(token, envs.JWT_SECRET);
            
            return true;
        }
        catch(error:any){
            throw new Error(`Error executing query: ${error.message}`);
            return false;
        }
    }
    RerefreshToken() {
        return "token";
    }


}