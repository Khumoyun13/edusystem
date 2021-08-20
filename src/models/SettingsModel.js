export default async (Sequelize, sequelize) => {
  return await sequelize.define(
    "settings",
    {
      name: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
      },
      value: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
