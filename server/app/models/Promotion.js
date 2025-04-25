const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Shop = require('./Shop')

class Promotion extends Model {}

Promotion.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shopId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Shop,
            key: 'id'
        }
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('show', 'hide', 'ban','isDeleted'),
        defaultValue: 'show',
        validate: {
            isIn: [['show', 'hide', 'ban', 'isDeleted']],
        }
    },
    banReason: {
        type: DataTypes.STRING,
        allowNull: true,
      }
}, {
    sequelize,
    modelName: 'Promotion',
    tableName: 'promotions',
    timestamps: true,
});

module.exports = Promotion;