import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, //cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, // cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } // creating the createdAr and updateAt automatically through mongoose
);

// Encryption of password using BCRYPT module and also using moongose pre() method from mongoose
userSchema.pre("save", async function (next) {
  // NEVER USE ARROW FN HERE
  if (!this.isModified("password")) return next(); // what is the
  this.password = await bcrypt.hash(this.password, 10);
  // next(); mongoose autmatically call next if written mongoose get confused 
});

// Decryption of password
userSchema.methods.isPasswordCorrect = async function (password) {
  await bcrypt.compare(password, this.password);
};

// Generate access token with jwt token
userSchema.methods.generateAcessToken = function () {
  // short lived access token
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
// sturcture of jwt .sign is (data,secret key,duration of session)
userSchema.methods.generateRefreshToken = function () {
  // short lived access token
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
