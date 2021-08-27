export default async (Sequelize, sequelize) => {
  return await sequelize.define(
    "files",
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4(),
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING(64),
        allowNull: false,
      },
      size: {
        type: Sequelize.DataTypes.STRING(16),
        allowNull: false,
      },
      mimetype: {
        type: Sequelize.DataTypes.STRING(16),
        allowNull: false,
      },
      path: {
        type: Sequelize.DataTypes.STRING(128),
        allowNull: false,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
