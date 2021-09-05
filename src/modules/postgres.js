import { Sequelize } from "sequelize";
import config from "../config.js";

import UserModel from "../models/UserModel.js";
import AttemptsModel from "../models/AttemptsModel.js";
import BanModel from "../models/BanModel.js";
import SessionModel from "../models/SessionModel.js";
import FileModel from "../models/FileModel.js";
import TeachersModel from "../models/TeachersModel.js";
import TestModel from "../models/TestModel.js";
import CourseModel from "../models/CourseModel.js";
import ModuleModel from "../models/ModuleModel.js";
import LessonModel from "../models/LessonModel.js";

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
  logging: false,
});

async function postgres() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    let db = {};
    db.users = await UserModel(Sequelize, sequelize);
    db.teachers = await TeachersModel(Sequelize, sequelize);
    db.attempts = await AttemptsModel(Sequelize, sequelize);
    db.bans = await BanModel(Sequelize, sequelize);
    db.sessions = await SessionModel(Sequelize, sequelize);
    db.files = await FileModel(Sequelize, sequelize);
    // db.test = await TestModel(Sequelize, sequelize);
    db.courses = await CourseModel(Sequelize, sequelize);
    db.modules = await ModuleModel(Sequelize, sequelize);
    db.lessons = await LessonModel(Sequelize, sequelize);

    await db.users.hasMany(db.attempts, {
      foreignKey: "user_id",
    });

    await db.users.hasMany(db.bans, {
      foreignKey: "user_id",
    });

    await db.users.hasMany(db.sessions, {
      foreignKey: "user_id",
    });

    await db.users.hasMany(db.files, {
      foreignKey: "user_id",
    });

    // await db.attempts.belongsTo(db.users, {
    //   foreignKey: "user_id",
    // });

    // await db.bans.belongsTo(db.users, {
    //   foreignKey: {
    //     name: "user_id",
    //     allowNull: false,
    //   },
    // });

    await sequelize.sync({ force: false });

    // await db.lessons.create({
    //   name: "1 qism",
    //   module: "fde81ea6-e026-4fc7-b767-b0a5e610b05b",
    // });

    // let x = await db.test.create({
    //   test: 787555
    // });

    // let x = await db.settings.create({
    //   name: "ban_time",
    //   value: "7200000",
    // });

    // console.log(x.dataValues);

    // await db.settings.update({
    //   name: "code_time",
    // }, {
    //   where: {
    //     id: "4"
    //   }
    // })

    return db;
  } catch (e) {
    console.error("Unable to connect to the database:", e);
  }
}

export default postgres;
