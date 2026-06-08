import {v2 as cloudinary} from "cloudinary";
import fs from 'fs'
import dotenv from 'dotenv';
dotenv.config();
                          

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath)=>{
    try {
      if(!localFilePath) return null
      // uploading the file on cloudinary 
     const response =  await cloudinary.uploader.upload(localFilePath,{
        resource_type : "auto"
      })
        console.log(response.url);
        fs.unlinkSync(localFilePath);
    return response        
    } catch (error) {
      console.log(error);
      
        fs.unlinkSync(localFilePath) // delete the saved localfile
        return null;
    }
}

const uploadDeleteOnCloudinary = async(public_id)=>{
  try {
    if (!public_id) {
      return 'Give File path to delete from cloudinary';
    }
    const response = await cloudinary.uploader.destroy(public_id, {
      resource_type: 'auto',
    });
    return response
  } catch (error) {
    throw Error("Something went wrong while delting the file")
  }
}
export { 
  uploadOnCloudinary,
  uploadDeleteOnCloudinary
}