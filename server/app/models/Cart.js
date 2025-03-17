const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');
const Product = require('./Product');

class Cart extends Model {}

Cart.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId',
        },
        onDelete: 'CASCADE'
    },
    productID: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'productId',
        },
        onDelete: 'CASCADE'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: true,
});

module.exports = Cart;
