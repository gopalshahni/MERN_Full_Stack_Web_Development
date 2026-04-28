import { asyncHandler } from "../utils/asyncHandles.js";
import { ApiError } from "../utils/Api.Error.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { jwt } from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) =>{
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new ApiError(200,"User not registerd")
    }
   const accesToken =  user.generateAcessToken()
   const RefreshToken =  user.generateRefreshToken()
  
   user.refreshToken = RefreshToken
   await user.save({validateBeforeSave : false})
   return {accesToken,refreshToken}
  } catch (error) {
    throw new ApiError(500, "Something went wrong while Creating Tokens (access or refersh")
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  // Validation
  if (
    [fullname, email, username, password].some(
      (field) => !field || !field.trim()
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(400, "User with email or username already exists");
  }

  try {
    // File paths from multer
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverLocalPath = req.files?.coverImage?.[0]?.path;
  
    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is missing");
    }
  
    // Upload avatar
    let avatar;
    try {
      avatar = await uploadOnCloudinary(avatarLocalPath);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      throw new ApiError(400, "Failed to upload avatar");
    }
  
    // Upload cover image if provided
    let coverImage = null;
    if (coverLocalPath) {
      try {
        coverImage = await uploadOnCloudinary(coverLocalPath);
      } catch (error) {
        console.error("Error uploading cover image:", error);
        // Not fatal: allow user creation without cover image
      }
    }
  
    // Create user
    const user = await User.create({
      fullname,
      avatar: avatar?.url || "",
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });
  
    const createdUser = await User.findById(user._id);
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering a user");
    }
  
    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
  
    // Cleanup uploaded files from Cloudinary if user creation fails
    if (avatar) {
      await deleteFromCloudinary(avatar.public_id);
    }
    if (coverImage) {
      await deleteFromCloudinary(coverImage.public_id);
    }
    return res.status(500).send("user creation failed",error)
  }
});

const loginUser = asyncHandler(async (req,res) =>{
  // get data from body 
  const {email,username,password} = req.body 

  // validation 
  if(!email){
    throw new ApiError(400,"Email is required")
  }

  const user = await User.findOne({
    $or : [{username},{email}]
  })
  if(!user){
    throw new ApiError(404, "User not found")
  }

  // validate password
  const isPasswordCorrect = await user.isPasswordCorrect(password)
  if(!isPasswordCorrect){
    throw new ApiError("401", "Invalid crenditials")
  }

  const {accesToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedUser = await User.findById(user._id).select("-password -refreshToken")
  const options = {
    httpOnly : true, // it blocks user side to modify the cookies
    secure : process.env.NODE_ENV === "production",
  }

  return res
  .status(200)
  .cookie("accesToken",accesToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(new ApiResponse(
    200,
    {user : loggedUser, accesToken,refreshToken},"User logged in Successfully"))
})

const refreshAccessToken = asyncHandler(async (req,res)=>{
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if(!incomingRefreshToken){
    throw new ApiError(401, "Refresh token is required")
  }

  try {
    const decodeToken = jwt.verify(
      incomingRefreshToken,
      process.env.ACCESS_TOKEN_SECRET
    )
    await User.findById(decodeToken?._id)
    if(!user){
      throw new ApiError (401,"Invalid refresh token")
    }

    if(incomingRefreshToken !== user?.refreshToken){
      throw new ApiError(401,"Invalid refresh token");
    }

    const options = {
      httpOnly : true,
      secure : process.env.NODE_ENV === "production"
    }

  const {accesToken, refreshToken : newRefreshToken} = await generateAccessAndRefreshToken(user._id)

  return res
  .status(200)
  .cookie("accessToken",accesToken,options)
  .cookie("refreshToken",newRefreshToken,options)
  .json( 
    new ApiResponse(
      200,
      {accesToken,
        refreshToken : newRefreshToken
      },
      "Access token refreshed successfully"
    )
  )
  } catch (error) {
    throw new ApiError(500," Something went wrong while refresh access token ");
    
  }
})

const logoutUser = asyncHandler(async (req,res)=>{
  await User.findByIdAndUpdate(req,user._id,{
    $set : {
      refreshToken : null 
    }
  },
{new: true}
)
const options = {
  httpOnly : true,
  secure : process.env.NODE_ENV === 'production'
}

  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie('refreshToken',options)
  .json(new ApiResponse(200,{},"user looged out succesfully "))
})

const changeCurrentPassword = ayncHandler(async (req,res) => {
  const {oldPassword, newPassword} = req.body
  const user = await User.findById(req.user?._id)

  const isPasswordValid = await user.isPasswordCorrect(oldPassword)

  if(!isPasswordValid){
    throw new ApiError(400,"old password is incorrect")
  }

  user.password = newPassword 
  await user.save({validateBeforeSave : false})

  return res.status(200)
  .json(new ApiResponse(200,{},"password changed successfully"))
} )

const getCurrentUser = ayncHandler(async (req,res) => {
return res
  .status(200)
  .json(new ApiResponse(200, req.user, "Current User Details"));
} )

const updateAccountDetails = ayncHandler(async (req,res) => {
const {fullname,email} = req.body 
if(!fullname || !email){
  throw new ApiError(400,"fullname and email are required")
}
  const user = await User.findByIdAndUpdate(req.user?._id,{
    $set : {
      fullname,
      email : email
    }
  },
{new : true}
).select("-password -refreshToken")

return res
  .status(200)
  .json(new ApiResponse(200, user, "Account Details updated Successfully"));
} )

const updateUserAvatar = ayncHandler(async (req,res) => {
 const avatarLocalPath = req.file?.path
 if(!avatarLocalPath){
  throw new ApiError(400, "file is required")
 }

 const avatar = await uploadOnCloudinary(avatarLocalPath)

 if(!avatar.url){
  throw new ApiError(500, "Something went wrong while uploading avatar")
 }
  const user = await User.findByIdAndUpdate(req.user?._id,{
  $set : {
    avatar : avatar.url
  }
 },
{new : true}
).select("-password - refreshToken")

return res
  .status(200)
  .json(new ApiResponse(200, user, "Avatar updated Successfully"));
} )

const updateUserCoverImage = ayncHandler(async (req,res) => {
  const CoverImageLocalPath = req.file?.path;
  if (!CoverImageLocalPath) {
    throw new ApiError(400, "file is required");
  }

  const coverImage = await uploadOnCloudinary(CoverImageLocalPath);
  if(!coverImage){
    throw new ApiError(400, "Something went wrong while uploading cover image")
  }

 const user = await  User.findByIdAndUpdate(
    req.user?._id,
    {
      $set : {
        coverImage : coverImage.url
      }
    },
    {new : true}
  ).select("-password -refreshToken")

  return res
  .status(200)
  .json(new ApiResponse(200,user, "Cover image updated Successfully"))
} )

const getUserChannelProfile = ayncHandler(async (req,res)=>{
  const {username} = req.params
  
  if(!username){
    throw new ApiError(400,"Username is not found")
  }
  const channel = await User.aggregate([
    {
      $match : {
        username : username.toLowerCase()
      }
    },
    {
      $lookup : {
        from : "subscriptions",
        localField : "_id",
        foreignField : "channel",
        as : "subscribers"
      }
    },
    {
      $lookup : {
        from : "subscriptions",
        localField : "_id",  
        foreignField : 'subscriber', 
        as : "subscribedTo"
      }
    },
    {
      $addFields : {
        subscriberCount :  {
          $size : "$subscribers" // use $ sign whenever you are creating a new variable
        },
        channelsSubscribedToCount : {
          $size : "$subscribedTo"
        },
        isSubscribed : {
          $cond : {
            if : {$in : [req,user?._id,"$subscribers,subscriber"]},
            then : true ,
            else : false
          }
        }
      }
    },

    {
      //Project only neccessory data 
      $project : {
        fullname : 1,
        username : 1,
        avatar : 1,
        subscriberCount : 1,
        isSubscribed : 1,
        coverImage : 1,
        email : 1
      }
    }
  ])

  if(!channel?.length){
    throw new ApiError(404, " channel not found")
  }

  return res
  .status(200)
  .json( new ApiResponse(200,channel[0],
    "Channel profile fetched successfully"
  ))

})
const getWatchHistory = ayncHandler(async (req,res)=>{
  const user = await User.aggregate([
    {
      $match : {
        _id :  new mongoose.Types.ObjectId(req.user?._id)
      }
    },

    {
      $lookup : {
        from : "videos",
        localField : "watchHistory",
        foreignField : "_id",
        as : "watchHistory",
        pipeline : [
          {
            $lookup : {
              from : "users",
              localField : "owner",
              foreignField : "_id",
              as : "owner",
              pipeline : [{
                $project : {
                  fullname : 1,
                  username : 1,
                  avatar : 1
                }
              },
            {
                  $addFields : {
                    owner : {
                      $first : "owner "
                    }
                  }
                }]
            }
          }
        ]
      }
  },
  ]),

  return res 
  .status(200)
  .json(new ApiResponse(200,user[0]?.wathchHistory, "Watch history fetched Successfully"))
})
export { 
  registerUser,
  loginUser,
  refreshAccessToken, 
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory
 };
