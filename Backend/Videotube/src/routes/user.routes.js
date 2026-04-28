import { Router } from "express";
import { registerUser ,logoutUser, loginUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, getUserChannelProfile, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getWatchHistory } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verfiyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route('/login').post(loginUser)
router.route('/refreshAccessToken').post(refreshAccessToken)
// secured routes 

router.route ("/change-password").post(verfiyJWT,changeCurrentPassword)
router.route('/logout'.post(verfiyJWT,logoutUser))// verifyJwt middleware will check if the user is authenticated before allowing access to the logout route

router.route("/current-user").get(verfiyJWT,getCurrentUser)
router.route("/c/:username").get(verfiyJWT,getUserChannelProfile)
router.route("/update-account").patch(verfiyJWT,updateAccountDetails)
router.route("/avatar").patch(verfiyJWT,upload.single("avatar"),updateUserAvatar)
router.route("/cover-image").patch(verfiyJWT,upload.single("coverImage"),updateUserCoverImage)

router.route('/history').get(verfiyJWT,getWatchHistory)

export default router;
