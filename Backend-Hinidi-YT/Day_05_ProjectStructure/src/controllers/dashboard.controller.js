import mongoose from 'mongoose';
import { Video } from '../models/video.model.js';
import { Subscription } from '../models/subscription.model.js';
import { Like } from '../models/like.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like 
  // 1. total video views,
  // 2. total subscribers,
  // 3. total videos,
  // 4. total likes etc.

  const totalViews = await Video.aggregate([
    {
      $match : {
        owner : mongoose.Types.ObjectId(req.user._id)
      }
    },
    {
      $group : {
        _id : "$owner",
        totalViewsCount : {$sum : "$views"}
      }
    }
  ])

  if(!totalViews){
    throw new ApiError(500,"something went wrong while getting totalViews")
  }

  const totalSubscriber = await Subscription.aggregate([
    {
      $match : {
        channel : new mongoose.Types.ObjectId(req.user._id)
      }
    },
    {$count : "totalsubcriber"}
  ])

  if (!totalSubscriber) {
    throw new ApiError(500, 'something went wrong while getting totalSubscriber');
  }


 const totalVideos = await Video.aggregate([
   {
     $match: { owner: new mongoose.Types.ObjectId(req.user._id) },
   },
   {
     $count: "totalVideosCount",
   },
 ]);

 if (!totalVideos) {
   throw new ApiError(500, 'something went wrong while getting totalVideos');
 }

  const totalLikesForMyVideos = await Like.aggregate([
    {
      $lookup: {
        from: 'videos', // join with Video collection
        localField: 'video', // Like.video reference
        foreignField: '_id', // Video._id
        as: 'videoData',
      },
    },
    { $unwind: '$videoData' }, // flatten array
    {
      $match: { 'videoData.owner': mongoose.Types.ObjectId(req.user._id) },
      // only likes where the video belongs to you
    },
    {
      $count: 'myTotalLikes', // count all likes across your videos
    },
  ]);

  if(!totalLikesForMyVideos){
    throw new ApiError(400,"No likes found for myVidoes")
  }


  return res
  .status(200)
  .json(new ApiResponse(200,{totalViews,totalLikesForMyVideos,totalSubscriber,totalVideos},"All things are fetched Succuessfully"))
});


const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
const AllVideos = await Video.aggregate([
  {$match : {
    owner : mongoose.Types.ObjectId(req.user._id)
  }},
])

if(!AllVideos){
  throw new ApiError(400, "No video found for dasboard")
}
return res
.status(200)
.json(new ApiResponse(200,AllVideos,"all videos are fetched succuessfully"))

});

export { getChannelStats, getChannelVideos };
