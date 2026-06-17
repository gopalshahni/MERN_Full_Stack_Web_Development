import {asyncHandler} from '../utils/asyncHandler.js'
import ApiError from "../utils/Api.Error.js"
import {User} from "../models/user.model.js"
import {
  uploadOnCloudinary,
  uploadDeleteOnCloudinary,
} from '../utils/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js'
import cookieParser from 'cookie-parser'
import jwt from "jsonwebtoken"
import mongoose, { mongo } from 'mongoose';


const generateAccessAndRefreshTokens = async (userID)=>{
  try {
    const user = await User.findById(userID)
    const accessToken = user.generateAccessToken()
    const refreshToken =  user.generateRefreshToken()

    // Saving refreshToken in db 
    user.refreshToken = refreshToken;
    // this ignore required types because we don't need problems while saving refresh Token
    await user.save({validateBeforeSave : false })
    return {accessToken,refreshToken}
  } catch (error) {
    throw new ApiError(500,"Something went wrong while generating refresh Token")
  }
}
const registerUser = asyncHandler(async(req, res ) => {
    // user validation
    // check if user already exists : username , email 
    // check for images , check for avatar 
    // upload them to cloudinary (check avatar is u;loaded or not )
    // create user object - create entry in db 
    // remove password and refresh token field from respnse 
    // check for user creation
    // return res 
  
    const {fullname, email,username , password } = req.body
    if( 
      [fullname,email,username,password].some((field)=>field?.trim() === '')
    ){
      throw new ApiError(400,"All fields are required")
    }


    const existedUser = await User.findOne({
      $or : [{username},{email}]
    })
   
    

    if(existedUser){
      throw new ApiError(409, "User already existed ")
    }

    // getting files from local storage on server 
    const avatarLocalPath = req.files?.avatar[0]?.path;
    
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
   
    
    if(!avatarLocalPath){
      throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    console.log(avatar);
    
    if(!avatar){
      throw new ApiError(500,"Failed to upload avatar")
    }

   const user = await User.create({
     fullname,
     avatar: {
       url: avatar.secure_url,
       public_id: avatar.public_id,
     },
     coverImage: {
       url: coverImage?.secure_url || '',
       public_id: coverImage?.public_id || '',
     },
     password,
     email,
     username: username.toLowerCase(),
   });
    // checking user is created or not and if created let also remove password and -refreshToken
    const CreatedUser = await User.findById(user._id).select("-password -refreshToken")
    if(!CreatedUser){
      throw new ApiError(500, "something went wrong while registering the user ")
    }
    return res.status(201).json(
      new ApiResponse(200,CreatedUser,"User registered Successfully"))
    })

const loginUser = asyncHandler(async (req,res)=>{
  // req, body => data,
  // match is user registered
  // user found generate acess and refresh token.
  // send them in cookies

  const { username, password, email } = req.body;
  if (!username && !password) {
    throw new ApiError(400, 'username & password is required');
  }
  const user = await User.findOne({
    $or: [{ username }, { email }], // pass and arr of obj. using mongoose $or method
  });

  if (!user) {
    throw new ApiError(400, 'user not found');
  }

  // password check
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, 'Invalid credintals');
  }
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
    user._id
  );
  user.refreshToken = refreshToken; // updating the current user locally because generateAccessAndRefreshTokens updated the refresh Token in the Db
  // now lets define cookies and for that we need options to be created 

  const options = {
    httpOnly : true ,
    secure : true
  }
  return res
  .status(200)
  .cookie("access Token",accessToken,options)
  .cookie("refresh Token",refreshToken,options)
  .json(
    new ApiResponse(200,{
      user : logineUser,accessToken,refreshToken
    },"User Logged In successfully")
  )
})

const logOutUser = asyncHandler(async(req,res)=>{
 
  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1 
      },
    },
    {
      new: true,
    }
  );

  const options =  {
    httpOnly : true,
    secure : true
  }
  
  return res
  .status(200)
  .clearcookie("accessToken",options)
  .clearcookie("refreshToken",options)
  .json(new ApiResponse(200,{},"User logout SuccessFully"))
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const IncomingRefreshToken = req.cookie.accessToken || req.body.refreshToken
try {
  
      if(!IncomingRefreshToken){
        throw new ApiError(401,"unauthorized request")
      }
  
      const decodedToken = jwt.verify(IncomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  
      const user = await User.findById(decodedToken._id)
  
      if(!user){
        throw new ApiError(401,"Invalid Refresh Token")
      }
  
      if(IncomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401,"Refresh Token is expired or Used")
      }
      const options = {
        httpOnly : true,
        secure : true
      }
     const {accessToken,newrefreshToken} =  await generateAccessAndRefreshTokens(decodedToken._id)
  
      return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', newrefreshToken, options)
        .json(
          new ApiResponse(200, { accessToken, refreshToken: newrefreshToken }, "Acess Token refreshed successfully")
        );
} catch (error) {
  throw new ApiError(401,error?.message || "Invalid Refresh Token ")
}
})

const updateUserPassword = asyncHandler(async (req,res)=>{
  // here we are taking data from user which we created during auth middleware which holds user data
  const {oldPassword , newPassword} = req.body
  
  const user = await  User.findById(req.user?._id);
  const isPassowrdCorrect = await user.isPasswordCorrect(oldPassword)

  if(!isPassowrdCorrect){
    throw new ApiError(400,"Please provide correct Password")
  }
  user.password = new newPassword
  await user.save({validateBeforeSave:false})

  res
  .status(200)
  .json(new ApiResponse(200,{},"Password Change Succesfully"))
})
const getCurrentUser = asyncHandler(async(req,res)=>{
  res
    .status(200)
    .json(new ApiResponse(200, req.user, 'User Fetched SuccessFully'));
})

const updateAccountDetails = asyncHandler (async(req,res)=>{
  const {fullname,email} = req.user

  if(!(fullname || email)){
    throw new ApiError(400,"Please send required fields data")
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set : {
        fullname,
        email
      }
    },
    {new : true} // this will return value after updating completely
  ).select("-password -refreshToken")

  res
  .status(200)
  .json(new ApiResponse(200,user,"User Fullname and email Updated SuccessFully "))
})

const updateAvatar = asyncHandler(async(req,res)=>{
  const avatarLocalPath = req.file?.path
  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is missing")
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath)

  if(!avatar.url){
    throw new ApiError(500, "Error while uploading on avatar")
  }
  await User.findByIdAndUpdate(_id,
    {
      $set : {avatar : avatar.url}
    }, { new : true}
  ).select("-password -refreshToken")
// calling deleting fn here from cloudinary utility
const { public_id: oldFilePath } = req.user.avatar;
uploadDeleteOnCloudinary(oldFilePath);

  res
  .status(200)
  .json(new ApiResponse(200,{},"Avatar updated SuccessFully"))
})



const updateCoverImage = asyncHandler(async (req, res) => {
  const CoverImageLocalPath = req.file?.path;
  if (!CoverImageLocalPath) {
    throw new ApiError(400, 'Cover Image file is missing');
  }
  const CoverImage = await uploadOnCloudinary(CoverImageLocalPath);

  if (!CoverImage.url) {
    throw new ApiError(500, 'Error while uploading on Cover Image');
  }
  await User.findByIdAndUpdate(
    _id,
    {
      $set: { coverImage: CoverImage.url },
    },
    { new: true }
  ).select('-password -refreshToken');
  // calling deleting fn here from cloudinary utility
  const { public_id: oldFilePath } = req.user.coverImage;
  uploadDeleteOnCloudinary(oldFilePath);

  res
    .status(200)
    .json(new ApiResponse(200, {}, 'Cover Image updated SuccessFully'));
})

const getUserChannelProfile = asyncHandler(async(req,res)=>{
  const {username} = req.params

  if(!username?.trim()){
    throw new ApiError(400, "username is missing")
  }

    const channel = await User.aggregate([
      {
        $match: {
          username: username?.toLowerCase(),
        },
      },
      {
        $lookup: {
          from: 'subscriptions',
          localField: '_id',
          foreignField: 'channel',
          as: 'subscribers',
        },
      },
      {
        $lookup: {
          from: 'subscriptions',
          localField: '_id',
          foreignField: 'subscriber',
          as: 'subscribedTo',
        },
      },
      {
        $addFields: {
          subscribersCount: {
            $size: '$subscibers',
          },
          channelSubscibedToCount: {
            $size: '$subscribedTo',
          },
          isSubscribed: {
            $cond: {
              if: { $in: [req.user?._id, '$subscribers.subscirber'] },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          fullname: 1,
          username: 1,
          subscribersCount: 1,
          channelSubscibedToCount: 1,
          isSubscribed : 1,
          avatar : 1,
          email : 1,
          coverImage : 1
        },
      },
    ]);

    if(!channel?.length){
      throw new ApiError(404, "channel doesn't exist ")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, channel[0],"User channel fetched Successfully"))
})

const getWattchHistory = asyncHandler(async(req,res)=>{
  const user = await User.aggregate([
    {
      $match : { // Note mongo db store _id as 12 byte value it is an object Id converted Id and mongooe help to convert it back to  
        _id : new mongoose.Types.ObjectId(req.user._id)
      }
    },
    {
      $lookup : {
        from : "videos",
        localField :"watchHistory",
        foreignField : "_id",
        as : "watchHistory",
        pipeline : [{
          $lookup : {
            from : "users",
            localField : "owner",
            foreignField : "_id",
            as : "owner",
            pipeline : [{
              $project : {
                fullname : 1,
                username : 1,
                avatar : 1,            
              }
            }]
          }
        }]
      }
    },
    {
      $addFields :{
        $first : "$owner"
      }
    }
  ])

  return  res
  .status(200)
  .json(
    new ApiResponse(200,user[0].watchHistory,"Watch History fetched Successfully")
  )
})
export {
  registerUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  updateUserPassword,
  getCurrentUser,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
  getUserChannelProfile,  
  getWattchHistory
};