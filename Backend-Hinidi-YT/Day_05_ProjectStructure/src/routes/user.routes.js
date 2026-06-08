import { Router } from "express";
import { registerUser ,loginUser, logOutUser, refreshAccessToken, updateUserPassword, getCurrentUser, updateAccountDetails, updateAvatar, updateCoverImage, getUserChannelProfile, getWattchHistory } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middlware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()


router.route("/register").post(upload.fields( // multer middlware to handle multiple file uploads.
    [{
        name : "avatar",
        max : 1
    },
    {
        name : "coverImage",
        max : 1 
    }]
),registerUser)

router.route('/login').post(loginUser);
// secured routes 
router.route("/logout").post(verifyJWT, logOutUser)

router.route("/refreshToken").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,updateUserPassword)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/update-account-details").patch(verifyJWT,updateAccountDetails)

router.route("/change-avatar").patch(verifyJWT,upload.single("avatar"),updateAvatar) // using patch because we are uploading single thing at a time 

router.route("/change-cover-image").patch(verifyJWT,upload.single("CoverImage"),updateCoverImage)

// we use path because we are using username from the path to fetch User profile
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)

router.route("/Watch-History").get(verifyJWT,getWattchHistory)
export default router 