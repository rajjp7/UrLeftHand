import e from "express";
import mongoose, { model, Schema } from "mongoose"; 

//mongoose.connect("mongodb+srv://patilraj0026_db_user:<>@cluster0.qjivvtx.mongodb.net/?appName=Cluster0");
const UserSchema = new Schema({
    username:{type:String,unique:true},
    password: String
}) 

const UserModel = model("User",UserSchema);

const ContentSchema = new Schema ({
    title : String,
    link : String,
    tags : [{
        type : mongoose.Types.ObjectId,
        ref : "Tag"
    }],
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    }
})

const ContentModel = model("Content",ContentSchema);
export {UserModel, ContentModel};