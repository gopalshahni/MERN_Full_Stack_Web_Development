import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    username : {
        type : String,
        required : true ,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String,/// cloudinary true 
        required : true
    },
    coverImage : {
        type : String,
    },
    watchHistory : [
        {
            type: Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type : String,
        required : [true,'Password is required']
    },
    refershToken : {
        type : String
    }
},
{timestamps: true}
)
// password encryption
 UserSchema.pre('save',async function(next){
   if (!this.isModified("password")) return next() 
     this.password = await bcrypt.hash(this.password,10)
     next()
   
 })// don't use arrow fn coz they don't have their context
 
 // password checker method creation 
 UserSchema.methods.isPasswordCorrect = async function(passowrd){
    return await bcrypt.compare(passowrd,this.passowrd)
 }

 UserSchema.methods.generateAccessToken = function (){
    jwt.sign( // jwt takes first payload,then access token secret , then its expiry
      {
        _id: this._id,
        email: this.email,
        usename: this.username,
        fullname: this.fullname,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
 }
 UserSchema.methods.generateRefreshToken = function (){
     jwt.sign(
       // jwt takes first payload,then access token secret , then its expiry
       {
         _id: this._id,
       },
       process.env.REFRESH_TOKEN_SECRET,
       {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
       }
     );
 }
export const User = mongoose.model("User",UserSchema)