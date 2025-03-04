const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Shop = require('./Shop');

class Product extends Model {}

Product.init({
    productID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    discription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    shopID: {
        type: DataTypes.INTEGER,
        references: {
            model: Shop,
            key: 'shopID',
        },
    },
}, {
    sequelize,
    modelName: 'Products',
    timestamps: true,
});

module.exports = Product;