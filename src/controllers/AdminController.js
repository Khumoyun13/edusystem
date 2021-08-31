import SettingsValidation from "../validations/SettingsValidation.js";
import fs from "fs";
import path from "path";
let __dirname = path.resolve(path.dirname(""));

class AdminController {
  static async editSettings(req, res) {
    try {
      if (!req.super_admin) throw "Only super admin can change site settings!";
      
      const data = await SettingsValidation.validateAsync(req.body);

      const settings = {
        ...req.settings,
        ...data,
      };

      fs.writeFileSync(
        path.join(__dirname, "settings.json"),
        JSON.stringify(settings)
      );

      req.settings = settings;

      res.status(200).json({
        ok: true,
        message: "Successfully edited admin settings!",
      });
    } catch (e) {
      res.status(400).json({
        ok: false,
        message: e + "",
      });
    }
  }
}

export default AdminController;
