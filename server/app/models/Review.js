const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');
const Product = require('./Product');
const OrderDetail = require('./OrderDetail');

class Review extends Model {}

Review.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    buyerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: OrderDetail,
            key: 'orderId',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {  
            model: OrderDetail,
            key: 'productId',
        },
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['orderId', 'productId'],
        },
    ],
});

module.exports = Review;
