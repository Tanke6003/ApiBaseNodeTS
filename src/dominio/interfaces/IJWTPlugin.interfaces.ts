import { JWTOptions } from "../models/jwt.interfaces";

export interface IJWTPlugin{
    CreateToken(options:JWTOptions):string|void;
    VerifyToken(token:string):boolean;
    RerefreshToken():string;
}