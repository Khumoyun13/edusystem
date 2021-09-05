export default async (Sequelize, sequelize) => {
    return await sequelize.define(
      "modules",
      {
        module_id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4(),
          primaryKey: true,
        },
        name: {
            type: Sequelize.DataTypes.STRING(32),
            allowNull: false,
        },
        course: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
        }
      },
      {
        timestamps: false,
      }
    );
  };
  