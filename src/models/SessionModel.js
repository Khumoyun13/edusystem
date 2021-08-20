export default async (Sequelize, sequelize) => {
  return await sequelize.define(
    "sessions",
    {
      session_id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4(),
        primaryKey: true,
      },
      session_expire_date: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: 0,
      },
      user_agent: {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: false,
      },
      ip_address: {
        type: Sequelize.DataTypes.INET,
        allowNull: false,
      },
      session_number: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        autoIncrement: true
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
