import {asyncHandler} from '../utils/asyncHandler.js'
import ApiError from "../utils/Api.Error.js"
import {User} from "../models/user.model.js"
import uploadOnCloudinary from '../utils/cloudinary.js'
import ApiResponse from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async(req, res ) => {
    // user validation
    // check if user already exists : username , email 
    // check for images , check for avatar 
    // upload them to cloudinary (check avatar is u;loaded or not )
    // create user object - create entry in db 
    // remove password and refresh token field from respnse 
    // check for user creation
    // return res 

    const {fullname, email,username , passward } = req.body
    if( 
      [fullname,email,username,passward].some((field)=>field?.trinm() === '')
    ){
      throw new ApiError(400,"All fields are required")
    }


    const existedUser = User.findOne({
      $or : [{username},{email}]
    })

    if(existedUser){
      throw new ApiError(409, "User already existed ")
    }

    // getting files from local storage on server 
    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.covreImage[0]?.path;
    console.log(req.files);
    
    if(!avatarLocalPath){
      throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
      throw new ApiError(500,"Failed to upload avatar")
    }

   const user = await User.create({
      fullname,
      avatar : avatar.url,
      coverImage : coverImage?.url || "",
      password,
      email,
      username : username.tolowerCase()
    })
    // checking user is created or not and if created let also remove password and -refreshToken
    const CreatedUser = await User.findById(user._id).select("-password -refreshToken")
    if(!CreatedUser){
      throw new ApiError(500, "something went wrong while registering the user ")
    }
    return res.status(201).json(
      new ApiResponse(200,CreatedUser,"User registered Successfully"))
    })

export {registerUser}