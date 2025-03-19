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
        onDelete: 'CASCADE'
    },
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Product,
            key: 'productId',
        },
        onDelete: 'CASCADE' // confusions that whether to use onDelete or not in this case
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    priceAtPurchase: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'OrderDetail',
    tableName: 'order_details',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['orderId', 'productId']
        }
    ]
});

module.exports = OrderDetail;