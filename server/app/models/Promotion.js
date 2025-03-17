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
        references: {
            model: Shop,
            key: 'id'
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
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    modelName: 'Promotion',
    tableName: 'promotions',
    timestamps: true,
});

module.exports = Promotion;