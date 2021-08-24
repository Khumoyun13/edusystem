import { Sequelize } from "sequelize";
import config from "../config.js";

import UserModel from "../models/UserModel.js";
import AttemptsModel from "../models/AttemptsModel.js";
import BanModel from "../models/BanModel.js";
import SessionModel from "../models/SessionModel.js";
import SettingsModel from "../models/SettingsModel.js";
import FileModel from "../models/FileModel.js";

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
  logging: false,
});

async function postgres() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    let db = {};
    db.users = await UserModel(Sequelize, sequelize);
    db.attempts = await AttemptsModel(Sequelize, sequelize);
    db.bans = await BanModel(Sequelize, sequelize);
    db.sessions = await SessionModel(Sequelize, sequelize);
    db.settings = await SettingsModel(Sequelize, sequelize);
    db.files = await FileModel(Sequelize, sequelize);

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
