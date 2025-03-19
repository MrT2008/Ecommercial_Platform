const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');

class Order extends Model {}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    buyerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
        defaultValue: 'pending',
    }
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
});

module.exports = Order;