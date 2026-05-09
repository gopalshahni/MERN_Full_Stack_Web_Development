import { Router } from "express";
import { registerUser ,loginUser, logOutUser, refreshAccessToken } from "../controllers/user.controller.js";
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
export default router 