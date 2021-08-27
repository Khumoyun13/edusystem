import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import FileController from "../controllers/FileController.js";
import path from "path";
import fs from "fs";
let __dirname = path.resolve(path.dirname(""));
import multer from "multer";
// import fileUpload from "express-fileupload";

const router = express.Router();

router.use(AuthMiddleware);

// isExists
function isExists(files, req_user) {
  files.forEach((file, index) => {
    let file_user = file.split("*")[0];
    if (file_user === req_user) {
      fs.rmSync(`./src/public/data/uploads/${file}`);
    } 
  });
}

// Set Storage
const storage = multer.diskStorage({
  destination: "./src/public/data/uploads",
  filename: (req, file, cb) => {
    cb(null, req.user + "*" + file.originalname);
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    checkFile(req, file, cb);
  },
}).single("file");

// Check File type
function checkFile(req, file, cb) {
  const files = fs.readdirSync(`./src/public/data/uploads`);
  const isExist = isExists(files, req.user);
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    req.fileValidationError = "Images only!";
    return cb(null, false, req.fileValidationError);
  }
}

router.post("/upload", upload, FileController.uploadFile);

router.use("/get", express.static(`./src/public/data/uploads/`));

export default {
  path: "/file",
  router: router,
};
