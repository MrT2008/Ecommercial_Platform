const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Order = require('./Order');

class Transaction extends Model {}

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderID: {
        type: DataTypes.INTEGER,
        references: {
            model: Order,
            key: 'orderId',
        },
    },
    paymentMethod: {
        type: DataTypes.ENUM('credit card', 'debit card', 'cash'),
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'paid', 'failed'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
});

module.exports = Transaction;