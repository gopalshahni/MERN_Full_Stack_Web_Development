import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../../constants.js";

const connectDB = async () => {
  try {
    const connectionInst = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `\n MonogoDB connected ! DB host : ${connectionInst.connection.host} `
    );
  } catch (error) {
    console.log("MongoDb Connection error", error);
    process.exit(1);
  }
};
export default connectDB;
