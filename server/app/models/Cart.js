const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');
const Product = require('./Product');

class Cart extends Model {}

Cart.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE'
    },
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Product,
            key: 'id',
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
    indexes: [
        {
            unique: true,
            fields: ['userId', 'productId']
        }
    ]
});

module.exports = Cart;
