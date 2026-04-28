import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"
import e from "express";
dotenv.config()
// configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const respone = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // after succesfull upload , deleting on our server
    fs.unlinkSync(localFilePath); // unlinkSync will delete the file
    return respone;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    fs.unlinkSync(localFilePath); // unlinkSync will delete the file
    return null;
  }
};
const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
  }
}

export { deleteFromCloudinary };
export { uploadOnCloudinary };
