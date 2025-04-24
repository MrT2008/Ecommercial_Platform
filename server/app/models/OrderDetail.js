const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Order = require('./Order');
const Product = require('./Product');

class OrderDetail extends Model {}
OrderDetail.init({
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Order,
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Product,
            key: 'productId',
        },
    },
    shopId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Product,
            key: 'shopId',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    priceAtPurchase: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
    },
}, {
    sequelize,
    modelName: 'OrderDetail',
    tableName: 'order_details',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['productId', 'shopId', 'orderId'],
        },
    ],
});

module.exports = OrderDetail;