import multer from "multer";
import path from "path"
const storage = multer.diskStorage({
  // it takes have two properties one is destination and another is filename and each of them have a callback fn as cb where 1st parameter is error and 2nd parameter is path in destination and in filename it is the unique name of the file
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
 