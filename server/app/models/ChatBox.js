const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');

class ChatBox extends Model {}

ChatBox.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'ChatBox',
    tableName: 'ChatBoxes',
    timestamps: true,
});

module.exports = ChatBox;