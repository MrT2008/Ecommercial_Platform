const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
class Role extends Model {}

Role.init({
    roleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.ENUM('manager', 'moderator', 'buyer', 'seller'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Roles',
    timestamps: false,
});

module.exports = Role;