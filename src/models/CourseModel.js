export default async (Sequelize, sequelize) => {
  return await sequelize.define(
    "courses",
    {
      course_id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4(),
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING(24),
        allowNull: false,
      },
      teacher: {
        type: Sequelize.DataTypes.UUID,
      },
      description: {
        type: Sequelize.DataTypes.STRING(),
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
