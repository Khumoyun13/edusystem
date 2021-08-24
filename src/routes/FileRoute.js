import express, { response } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import FileController from "../controllers/FileController.js";
import path from "path";
import multer from "multer";
// import fileUpload from "express-fileupload";

const router = express.Router();

router.use(AuthMiddleware);

// Set Storage
const storage = multer.diskStorage({
  destination: "./src/public/data/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Init upload
const upload = multer({
  storage: storage,
  // limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFile(req, file, cb);
  },
}).single("file");


// Check File type
function checkFile(req, file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  const fileSize = file.size < 1000000;

  if (mimetype && extname && fileSize) {
    return cb(null, true);
  } else if(!fileSize) {
    req.fileSizeError = "File exceeds the limit size (1MB)!";
    return cb(null, false, req.fileSizeError);
  } else {
    req.fileValidationError = "Images only!";
    return cb(null, false, req.fileValidationError);
  }
}

router.post("/upload", upload, FileController.uploadFile)

export default {
  path: "/file",
  router: router,
};
