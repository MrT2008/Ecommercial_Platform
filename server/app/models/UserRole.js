const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');
const Role = require('./Role');

class UserRole extends Model {}

// UserRole (Many-to-Many Relationship)
UserRole.init({
    userID: { 
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "userId"
        }
    },
    roleID: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: "roleID"
        }
    },
}, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    timestamps: true,
})

module.exports = UserRole;