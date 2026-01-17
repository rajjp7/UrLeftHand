import { type Request, type Response } from "express";
import type { NextFunction } from "express";
import { JWTPASSWORD } from "./config.js";

import jwt from "jsonwebtoken";
export const userMiddleware = (req : Request,res : Response,next : NextFunction)=>{
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string,JWTPASSWORD);
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else{
        res.status(403).json({
            message : "Unauthorized"
        });
    }
}

