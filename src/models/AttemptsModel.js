export default async (Sequelize, sequelize) => {
  return await sequelize.define(
    "attempts",
    {
      attempt_id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4(),
        primaryKey: true,
      },
      attempts: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      code_attempts: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      code: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      code_expire_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: 0,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
      user_email: {
        type: Sequelize.DataTypes.STRING(64),
        references: {
          model: "users",
          key: "email",
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
