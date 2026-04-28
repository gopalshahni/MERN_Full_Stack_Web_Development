import mongoose from "mongoose"
import { type } from "node:os"

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true ,
        unique : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true ,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
    },
 }, {timestamps : true}
)

export const User = mongoose.model("user",UserSchema)