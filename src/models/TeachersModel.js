export default async (Sequelize, sequelize) => {
    return await sequelize.define(
      "teachers",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4(),
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING(32),
          allowNull: false,
        },
        email: {
          type: Sequelize.DataTypes.STRING(64),
          is: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.DataTypes.STRING(64),
        },
        phone: {
          type: Sequelize.DataTypes.STRING(13),
          is: /^9989[0123456789][0-9]{7}$/,
          allowNull: true,
          unique: true,
        },
        role: {
          type: Sequelize.DataTypes.ENUM,
          values: ["superadmin", "admin", "teacher", "student", "mentor"],
          allowNull: false,
          defaultValue: "student",
        },
        bdate: {
          type: Sequelize.DataTypes.DATEONLY,
          allowNull: false,
        },
        gender: {
          type: Sequelize.DataTypes.ENUM,
          values: ["male", "female"],
          allowNull: false,
        },
        isApproved: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        timestamps: false,
      }
    );
  };
  