const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.ENUM('manager', 'moderator', 'buyer', 'seller'),
        allowNull: false,
        validate: {
            isIn: [['manager', 'moderator', 'buyer', 'seller']],
        }
    },
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false,
});

module.exports = Role;