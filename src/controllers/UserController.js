// VALIDATIONS
import PhoneValidation from "../validations/PhoneValidation.js";
import SignupValidation from "../validations/SignupValidation.js";
import LoginValidation from "../validations/LoginValidation.js";
import CodeValidation from "../validations/CodeValidation.js";
import EmailValidation from "../validations/EmailValidation.js";
import PasswordValidation from "../validations/PasswordValidation.js";

// MODULES & MIDDLEWARES
import JWT from "../modules/jwt.js";
import sendMail from "../modules/mail.js";
// import sendSms from "../modules/sms.js";

// PACKAGES
import randomNumber from "random-number";
import pkg from "sequelize";
const { Op } = pkg;
import moment from "moment";
import bcrypt from "bcrypt";
import EditProfileValidation from "../validations/EditProfileValidation.js";

class UserController {
  // static async checkPhone(req, res) {
  //   try {
  //     const data = await PhoneValidation.validateAsync(req.body);

  //     let user = await req.postgres.users.findOne({
  //       where: {
  //         phone: data.phone,
  //       },
  //     });

  //     res.status(201).json({
  //       ok: true,
  //       exists: !!user,
  //     });
  //   } catch (e) {
  //     res.status(400).json({
  //       ok: false,
  //       message: e + "",
  //     });
  //   }
  // }

  // static async checkEmail(req, res) {
  //   try {
  //     const data = await EmailValidation.validateAsync(req.body);

  //     let user = await req.postgres.users.findOne({
  //       where: {
  //         email: data.email,
  //       },
  //     });

  //     res.status(201).json({
  //       ok: true,
  //       exists: !!user,
  //     });
  //   } catch (e) {
  //     res.status(400).json({
  //       ok: false,
  //       message: e + "",
  //     });
  //   }
  // }

  static async signup(req, res) {
    try {
      const data = await SignupValidation.validateAsync(req.body);

      const user = await req.postgres.users.findOne({
        where: {
          email: data.email,
        },
      });

      // const code_time = await req.postgres.settings.findOne({
      //   where: {
      //     name: "code_time",
      //   },
      // });

      if (!user) {
        const new_user = await req.postgres.users.create({
          name: data.name,
          email: data.email,
          bdate: data.bdate,
          gender: data.gender,
          phone: data.phone,
        });

        const generatedNumber = randomNumber.generator({
          min: 100000,
          max: 999999,
          integer: true,
        });

        const new_user_attempt = await req.postgres.attempts.create({
          code: generatedNumber(),
          code_expire_date: moment(Date.now() + Number(60000)),
          user_email: new_user.email,
          user_id: new_user.id,
        });

        const new_user_ban = await req.postgres.bans.create({
          user_email: new_user.email,
          user_id: new_user.id,
        });

        console.log(new_user_attempt.dataValues);

        // await sendMail(new_user.name, new_user.email, new_user_attempt.code);

        return res.status(201).json({
          ok: true,
          message: "Successfully sent verification code",
          data: new_user,
        });
      }

      if (user && user.isApproved === true)
        throw "Your email is already registered. Try to login!";

      if (user && user.isApproved === false) {
        const gn = randomNumber.generator({
          min: 100000,
          max: 999999,
          integer: true,
        });

        await req.postgres.attempts.update(
          {
            code: gn(),
            code_expire_date: moment(Date.now() + Number(60000)),
          },
          {
            where: {
              user_email: data.email,
            },
          }
        );

        // await sendMail(user.name, user.email, gn());

        return res.status(201).json({
          ok: true,
          message: "Successfully sent a new verification code",
          id: user.id,
        });
      }

      // let x = await req.postgres.attempts.destroy({
      //   where: {
      //     id: user.id
      //   }
      // })

      // let attempt = await req.postgres.attempts.create({
      //   code: generatedNumber(),
      //   id: user.id,
      // });

      // await sendSms(data.phone, `Your code: ${attempt.code}`);

      // console.log(user);
    } catch (e) {
      if (
        e == "SequelizeUniqueConstraintError: Validation error" &&
        e.path == "phone"
      )
        throw "Phone number already registered!";

      res.status(401).json({
        ok: false,
        message: e + "",
      });
    }
  }

  // static async signup(req, res) {
  //   try {
  //     const data = await SignupValidation.validateAsync(req.body);
  //     const email = data.email;

  //     const generatedNumber = randomNumber.generator({
  //       min: 100000,
  //       max: 999999,
  //       integer: true,
  //     });

  //     await sendMail(email, generatedNumber());

  //     res.status(201).json({
  //       ok: true,
  //       message: "Successfully registered",
  //       action: "Verify your email",
  //     });
  //   } catch (e) {
  //     res.status(401).json({
  //       ok: false,
  //       message: e + "",
  //     });
  //   }
  // }

  static async login(req, res) {
    try {
      // const data = await PhoneValidation.validateAsync(req.body);
      // const user = await req.postgres.users.findOne({
      //   where: {
      //     phone: data.phone,
      //   },
      // });

      const data = await LoginValidation.validateAsync(req.body);

      const user = await req.postgres.users.findOne({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        throw "User not found, try to Signup";
      }

      const ban = await req.postgres.bans.findOne({
        where: {
          user_id: user.id,
          ban_expire_date: {
            [Op.gt]: moment(Date.now()),
          },
        },
      });

      if (ban) {
        throw `You are banned until ${ban.ban_expire_date}`;
      }

      if (user && user.isApproved === false) {
        throw "You should verify your email to login!";
      }

      if (user && user.isApproved === true) {
        let isTrue = await bcrypt.compare(data.password, user.password);

        if (!isTrue) throw "Incorrect password!";

        const ipAddress =
          req.headers["x-forwarded-for"] || req.connection.remoteAddress;

        const userAgent = req.headers["user-agent"];

        if (!(ipAddress && userAgent)) throw "Invalid device";

        const session = await req.postgres.sessions.create({
          user_id: user.id,
          ip_address: ipAddress,
          user_agent: userAgent,
        });

        const token = JWT.generateToken({
          id: session.session_id,
        });

        await req.postgres.attempts.destroy({
          where: {
            user_id: user.id,
          },
        });

        await req.postgres.bans.update(
          {
            ban_attempts: 0,
          },
          {
            where: {
              user_id: user.id,
            },
          }
        );

        return res.status(201).json({
          ok: true,
          message: "Successfully logged in",
          token: token,
        });
      }

      // let x = await req.postgres.attempts.destroy({
      //   where: {
      //     id: user.id
      //   }
      // })

      // let attempt = await req.postgres.attempts.create({
      //   code: generatedNumber(),
      //   id: user.id,
      // });

      // await sendSms(data.phone, `Your code: ${attempt.code}`);
    } catch (e) {
      res.status(401).json({
        ok: false,
        message: e + "",
      });
    }
  }

  static async sendNewCode(req, res) {
    try {
      const validationId = req.headers["validation-id"];

      if (!validationId) throw "Required validation id";

      const gn = randomNumber.generator({
        min: 100000,
        max: 999999,
        integer: true,
      });

      const attempt = await req.postgres.attempts.findOne({
        where: {
          attempt_id: validationId,
        },
      });

      if (!attempt) throw "Missing validation id";

      const user = await req.postgres.users.findOne({
        where: {
          id: attempt.user_id,
        },
      });

      // const code_time = await req.postgres.settings.findOne({
      //   where: {
      //     name: "code_time",
      //   },
      // });

      await attempt.update({
        code: gn(),
        code_expire_date: moment(Date.now() + Number(60000)),
      });

      // await sendMail(user.name, user.email, attempt.code);

      console.log(attempt.dataValues);

      res.status(201).json({
        ok: true,
        message: "Successfully sent a new verification code",
      });
    } catch (e) {
      res.status(401).json({
        ok: false,
        message: e + "",
      });
    }
  }

  static async validateCode(req, res) {
    try {
      const validationId = req.headers["validation-id"];

      if (!validationId) throw "Required validation id";

      // const user = await req.postgres.users.findOne({
      //   where: {
      //     id: validationId,
      //   },
      // });

      const attempt = await req.postgres.attempts.findOne({
        where: {
          attempt_id: validationId,
        },
        // include: [
        //   {
        //     model: req.postgres.users,
        //     as: "user",
        //     where: { id: attempt.user_id },
        //   },
        // ],
        // *
        // include: [
        //   {
        //     model: req.postgres.users,
        //     as: "user",
        //     attributes: ["id", "email"],
        //   },
        //   {
        //     model: req.postgres.bans,
        //     as: "ban",
        //   },
        // ],
      });

      if (!attempt) throw "Missing validation id";

      const { code } = await CodeValidation.validateAsync(req.body);

      if (!code) throw "Invalid code";

      if (
        Number(code) === Number(attempt.code) &&
        attempt.code_expire_date >= moment(Date.now())
      ) {
        const user = await req.postgres.users.findOne({
          where: {
            id: attempt.user_id,
          },
        });

        if (!user) throw "Something went wrong";

        await user.update({
          isApproved: true,
        });

        return await res.status(201).json({
          ok: true,
          message: "Your email is successfully verified!",
        });
      }

      if (
        (Number(code) === Number(attempt.code) &&
          attempt.code_expire_date < moment(Date.now())) ||
        (Number(code) !== Number(attempt.code) &&
          attempt.code_expire_date < moment(Date.now()))
      ) {
        throw "Verification code expired!";
      }

      const code_attempts = await req.postgres.settings.findOne({
        where: {
          name: "code_attempts",
        },
      });

      if (attempt.attempts >= Number(code_attempts) - 1) {
        const ban = await req.postgres.bans.findOne({
          where: {
            user_id: attempt.user_id,
          },
        });

        if (!ban) throw "Something went wrong";

        // const ban_time = await req.postgres.settings.findOne({
        //   where: {
        //     name: "ban_time",
        //   },
        // });

        await ban.update({
          ban_attempts: ban.ban_attempts + 1,
          ban_expire_date: moment(Date.now() + Number(7200000)),
        });

        await attempt.destroy({
          where: {
            attempt_id: validationId,
          },
        });

        throw `You are banned until ${moment(ban.ban_expire_date)}`;
      }

      if (Number(code) !== Number(attempt.code)) {
        await attempt.update({
          attempts: attempt.attempts + 1,
        });

        throw "Invalid verification code";
      }
    } catch (e) {
      res.status(401).json({
        ok: false,
        message: e + "",
      });
    }
  }

  static async setPassword(req, res) {
    try {
      const validationId = req.headers["validation-id"];

      if (!validationId) throw "Missing validation id!";

      const user = await req.postgres.users.findOne({
        where: {
          id: validationId,
        },
      });

      const data = await PasswordValidation.validateAsync(req.body);

      let salt = await bcrypt.genSalt(10);
      let crypt = await bcrypt.hash(data.password, salt);

      await user.update({
        password: crypt,
      });

      res.status(201).json({
        ok: true,
        message: "You have successfully set your password!",
      });
    } catch (e) {
      res.status(401).json({
        ok: false,
        message: e + "",
      });
    }
  }

  static async editPersonalData(req, res) {
    try {
      const data = await EditProfileValidation.validateAsync(req.body);

      const info = {
        ...data,
      };

      const user = await req.postgres.users.update(info, {
        where: {
          id: req.user,
        },
      });

      res.status(202).json({
        ok: true,
        message: "Successfully updated your profile!",
        data: info,
      });
    } catch (e) {
      return console.log(e + "");

      res.status(400).json({
        ok: false,
        message: e + "",
      });
    }
  }

  static async getData(req, res) {
    try {
      const user = await req.postgres.users.findOne({
        where: {
          id: req.user,
        },
      });

      if(!user) throw "User not found!"

      res.status(200).json({
        ok: true,
        data: user.dataValues,
      });

    } catch (e) {
      res.status(500).json({
        ok: false,
        message: e + "",
      });
    }
  }

  static async promoteUser(req, res) {
    try {
      
    } catch (e) {
      
    }
  }
}

export default UserController;
