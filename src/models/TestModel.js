export default async (Sequelize, sequelize) => {
  return await sequelize.define(
    "test",
    {
      test: {
        type: Sequelize.DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
