import { jwt } from "jsonwebtoken";
import { ApiError } from "../utils/Api.Error.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandles";

export const verfiyJWT = asyncHandler(async(req,_,next)=>{
    const token = req.cookies.accessToken || req.header("Authorization").replace("Bearer",'')

    if(!token){
        throw new ApiError(401,"unauthorized")
    }
    try {
        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        
       const user =  await User.findById(decodeToken?._id).select("-password -refreshToken")

        if(!user){
            throw new ApiError(401,"User not found");
        }
        req.user = user 
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access Token")
    }
})


