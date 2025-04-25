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
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Order,
            key: 'id',
        },
    },
    paymentMethod: {
        type: DataTypes.ENUM('credit card', 'debit card', 'cash'),
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'paid', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
        validate: {
            isIn: [['pending', 'paid', 'failed']],
        }
    },
}, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
});

module.exports = Transaction;