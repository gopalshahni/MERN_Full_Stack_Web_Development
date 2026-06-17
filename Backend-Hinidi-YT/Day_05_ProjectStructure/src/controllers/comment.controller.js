import mongoose from 'mongoose';
import { Comment } from '../models/comment.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  try {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const comments = await Comment.find({ video: videoId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit) // skip based on page
      .limit(parseInt(limit));      
      
    return res
    .status(200)
    .json(new ApiResponse(200,comments,"comments fetched successfully"))
  } catch (error) {
    res.status(500).json({error : error.message})
  }

});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;
  const { content} = req.body;
  const {_id} = req.user

  if(!content){
    throw new ApiError(400,"Please give proper comment ")
  }
  if(!_id){
    throw new ApiError(500,"something went wrong while accessing user id  ")
  }
  
  const comment = await Comment.create({
    content,
    video: videoID,
    user: _id,
  });

  return res
  .status(200)
  .json(new ApiResponse(200,comment,"Comment added successfully"))
});



const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { videoId } = req.params;
  const { content} = req.body;
  const { _id } = req.user;
  const oldcomment = await Comment.find({owner :_id,video : videoID})

  if (!content) {
    throw new ApiError(400, 'Please give proper comment ');
  }
  if (!_id) {
    throw new ApiError(500, 'something went wrong while accessing user id  ');
  }
  if(oldcomment === content){
    throw new ApiError(400,"Please provide new comment")
  }
  
const comment = await Comment.findOneAndUpdate(
  { video: videoID, user: _id }, // filter by multiple fields
  { content },
  { new: true }
);

return res
  .status(200)
  .json(new ApiResponse(200, comment, 'Comment updated  successfully'));
});



const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { _id } = req.user;
  const { videoId } = req.params;
   if (!_id) {
    throw new ApiError(500, 'something went wrong while accessing user id ')
  }
  const commentdeltion = await Comment.findOneAndDelete({
    video: videoID,
    user: _id,
  });
  
  return res
  .status(200)
  .json (new ApiResponse(200,{},"Comment Deleted Successfully "))
});

export { getVideoComments, addComment, updateComment, deleteComment };
