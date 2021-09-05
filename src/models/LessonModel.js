export default async (Sequelize, sequelize) => {
    return await sequelize.define(
      "lessons",
      {
        lesson_id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4(),
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING(24),
          allowNull: false,
        },
        module: {
          type: Sequelize.DataTypes.UUID,
        },
        teacher: {
          type: Sequelize.DataTypes.UUID,
        },
        description: {
          type: Sequelize.DataTypes.STRING(),
          allowNull: true,
        },
        media_type: {
          type: Sequelize.DataTypes.ENUM,
          values: ["photo", "iframe", "video", "audio", "none"],
          defaultValue: "none",
        },
        media: {
          type: Sequelize.DataTypes.STRING(12),
          allowNull: true,
        },
        duration: {
          type: Sequelize.DataTypes.STRING(32),
          allowNull: true,
        },
        availabe_now: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        }
      },
      {
        timestamps: false,
      }
    );
  };
  