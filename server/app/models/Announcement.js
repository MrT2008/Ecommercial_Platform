const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User')

class Announcement extends Model {}

Announcement.init({
    announcementID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //ERD k có nhưng tui thêm vô để có 1-N 
    userID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userID',
        },
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
    startTime: {
        type: 'TIMESTAMP',
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    endTime: {
        type: 'TIMESTAMP',
        allowNull: false,
        validate: {
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
    modelName: 'Announcements',
    timestamps: true,
});

module.exports = Announcement;