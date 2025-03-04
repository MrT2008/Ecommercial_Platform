const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');
const Product = require('./Product');

class Cart extends Model {}

Cart.init({
    cartID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userID',
        },
        onDelete: 'CASCADE'
    },
    productID: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'productID',
        },
        onDelete: 'CASCADE'
        // confusions that whether to use onDelete or not in this case 
        // if not, like shopee
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize,
    modelName: 'Carts',
    timestamps: true,
});

module.exports = Cart;
