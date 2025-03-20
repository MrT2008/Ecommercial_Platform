const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');
const Role = require('./Role');

class UserRole extends Model {}
UserRole.init({
    userId: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: "id"
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Role,
            key: "id"
        }
    },
}, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    timestamps: true,
})

module.exports = UserRole;