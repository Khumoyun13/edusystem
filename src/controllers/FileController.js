import multer from "multer";

class FileController {
  static async uploadFile(req, res) {
    try {
      const uploadFile = req.file;
      if (req.fileValidationError) throw `${req.fileValidationError}`;
      if (!uploadFile) throw "No File selected!";

      await req.postgres.files.destroy({
        where: {
          user_id: req.user,
        },
      });

      const file = await req.postgres.files.create({
        name: uploadFile.originalname,
        size: uploadFile.size,
        mimetype: uploadFile.mimetype,
        path: uploadFile.path,
        user_id: req.user,
      });

      const user = await req.postgres.users.findOne({
        where: {
          id: req.user,
        },
      });

      if (file.user_id == user.id) {
        await user.update({
          profile_img_id: file.id,
        });
      }

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
