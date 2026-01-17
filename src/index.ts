import express from "express";
import mongoose from "mongoose";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserModel,ContentModel } from "./db.js";
import { JWTPASSWORD } from "./config.js";
import { userMiddleware } from "./middleware.js";
const app = express();
app.use(express.json());


app.post("/api/v1/signup",async (req,res)=>{
    //zod validation,hash password
    const username = req.body.username;
    const password = req.body.password;
    try{
        await UserModel.create({
            username : username,
            password : password
        })
    
        res.json({
            message : "User signed up"
        })
    }
    catch(e){
        res.status(411).json({
            message : "User already exists"
        })
    }
})

app.post("/api/v1/signin",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username : username,
        password : password
    });
    if(!existingUser){
        return res.status(403).json({
            message : "Invalid credentials"
        })
    }
    else{
        const token = jwt.sign({
            id : existingUser._id,
        },JWTPASSWORD)
        res.json({
            message : "User signed in",
            token : token
        })
    }
})

app.post("/api/v1/content",userMiddleware ,async(req,res)=>{
    const title = req.body.title;
    const link = req.body.link;
    await ContentModel.create({
        title,
        link,
        //@ts-ignore
        userId : req.userId,
        tags : []
    })
    res.json({
        message : "Content added"
    })
})

app.get("/api/v1/content",userMiddleware,(req,res)=>{
    //@ts-ignore
    const userID = req.userId;
    const content = ContentModel.find({
        userId : userID
    }).populate("userId","username");
    res.json({
        content : content
    })

})

app.delete("/api/v1/content",userMiddleware, async (req,res)=>{
    const contentId = req.body.content;
    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message : "content deleted"
    })
})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/brain/:sharelink",(req,res)=>{

})


app.listen(3000)