import e from "express";
import mongoose, { model, Schema } from "mongoose";
//mongoose.connect("mongodb+srv://patilraj0026_db_user:<>@cluster0.qjivvtx.mongodb.net/?appName=Cluster0");
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});
const UserModel = model("User", UserSchema);
export { UserModel };
