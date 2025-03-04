const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Order = require('./Order');
const Product = require('./Product');

class OrderDetail extends Model {}

OrderDetail.init({
    orderDetailID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderID: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'orderID',
        },
        onDelete: 'CASCADE' // If an order is deleted, delete all its order items
    },
    productID: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'productID',
        },
        onDelete: 'CASCADE'
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    priceAtPurchase: { // Stores price at the time of order
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'OrderDetails',
    timestamps: true,
});

module.exports = OrderDetail;