export default async (Sequelize, sequelize) => {
    return await sequelize.define('users', {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4(),
            primaryKey: true
        }, 
        code: {
            type: Sequelize.DataTypes.STRING(6),
            allowNull: false
        },
        attempts: {
            type: Sequelize.DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 0
        },
        isExpired: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
}