const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User')

class Announcement extends Model {}

Announcement.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    senderID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId'
        }
    },
    receiverID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
      },
    imageURL: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
        validate: {
            isURL: true,
            notEmpty: true
        }
    },
    script: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    sequelize,
    modelName: 'Announcement',
    tableName: 'announcements',
    timestamps: true,
});

module.exports = Announcement;