import { Sequelize } from "sequelize";
import config from "../config.js";

import UserModel from "../models/UserModel.js";
import AttemptsModel from "../models/AttemptsModel.js";

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

    await db.users.hasMany(db.attempts, {
      foreignKey: {
        name: "id",
        allowNull: false,
      },
    });

    await db.attempts.belongsTo(db.users, {
      foreignKey: {
        name: "id",
        allowNull: false,
      },
    });

    await sequelize.sync();
    return db;
  } catch (e) {
    console.error("Unable to connect to the database:", e);
  }
}

export default postgres;
