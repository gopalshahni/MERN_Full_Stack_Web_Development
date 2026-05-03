import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middlware.js";

const router = Router()


router.route("/register").post(upload.fields(
    [{
        name : avatar,
        max : 1
    },
    {
        name : coverImage,
        max : 1 
    }]
),registerUser)

export default router 