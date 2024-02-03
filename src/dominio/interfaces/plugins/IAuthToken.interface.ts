import { JWTOptions } from "../../models/jwt.interfaces";
import { NextFunction, Request,Response, } from "express";
export interface IJWTPlugin{
    CreateToken(options:JWTOptions):string|void;
    VerifyToken(token:string):boolean ;
    RefreshToken():string;
    validateAccess(req:Request,res: Response, next: NextFunction):any
}