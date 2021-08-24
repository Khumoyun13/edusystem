import multer from "multer";

class FileController {
  static async uploadFile(req, res) {
    try {
      const uploadFile = req.file;
      if(req.fileValidationError) throw `${req.fileValidationError}`
      if(req.fileSizeError) throw `${req.fileSizeError}`
      if (!uploadFile) throw "No File selected!";

      const file = await req.postgres.files.create({
        name: uploadFile.originalname,
        size: uploadFile.size,
        mimetype: uploadFile.mimetype,
        user_id: req.user,
      });

      res.status(200).json({
        ok: true,
        message: "File successfully uploaded",
      });
    } catch (e) {
      res.status(400).json({
        ok: false,
        message: e + "",
      });
    }
  }
}

export default FileController;
