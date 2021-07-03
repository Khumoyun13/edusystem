import { Sequelize } from "sequelize";
import config from "../config.js";

import UserModel from "../models/UserModel.js";

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
  logging: false,
});

async function postgres() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    let db = {};
    db.users = await UserModel(Sequelize, sequelize);
    await sequelize.sync();
    return db;
  } catch (e) {
    console.error("Unable to connect to the database:", e);
  }
};

export default postgres;