const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Shop = require('./Shop')

class Promotion extends Model {}

Promotion.init({
    promotionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //ERD k có nhưng tui thêm vô để có 1-N 
    shopID: {
        type: DataTypes.INTEGER,
        references: {
            model: Shop,
            key: 'shopID'
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
    modelName: 'Promotions',
    timestamps: true,
});

module.exports = Promotion;