import PhoneValidation from "../validations/PhoneValidation.js";
import SignupValidation from "../validations/SignupValidation.js";

class UserController {
  static async checkPhone(req, res) {
    try {
      const data = await PhoneValidation.validateAsync(req.body);

      let user = await req.postgres.users.findOne({
        where: {
          phone: data.phone,
        },
      });

      res.status(201).json({
        ok: true,
        exists: user ? true : false,
      });
    } catch (e) {
      res.status(400).json({
        ok: false,
        message: e + "",
      });
    }
  }

  static async signup(req, res) {
    try {
      const data = await SignupValidation.validateAsync(req.body);

      const user = await req.postgres.users.create({
        name: data.name,
        phone: data.phone,
        bdate: data.bdate,
        gender: data.gender == 1 ? "male" : "female",
      });

      res.status(201).json({
        ok: true,
        message: "Successfully registered",
        data: user.dataValues,
      });
    } catch (e) {
      if (e == "SequelizeUniqueConstraintError: Validation error") {
        e = "Phone already registered";
      }
      res.status(400).json({
        ok: false,
        message: e + "",
      });
    }
  }

  static async login(req, res) {
    try {
    } catch (e) {
      res.status(400).json({
        ok: false,
        message: e + "",
      });
    }
  }
}

export default UserController;
