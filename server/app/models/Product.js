const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Shop = require('./Shop');

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    shopId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Shop,
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    salePrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    saled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    thumbnailURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'soldout', 'ban'),
        defaultValue: 'active',
        validate: {
            isIn: [['active', 'inactive', 'soldout', 'ban']],
        }
    },
    banReason: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
});

module.exports = Product;