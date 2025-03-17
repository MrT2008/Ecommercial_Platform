const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');
const Product = require('./Product');

class Review extends Model {}

Review.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {  
            model: Product,
            key: 'id',
        },
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
            notEmpty: true
        },
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        validate: {
            isURL: true
        }
    },
}, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    // timestamps: true,
    // indexes: [
    //     {
    //         unique: true,
    //         fields: ['buyerId', 'productId']
    //     }
    // ]
    // Mua lại sản phẩm này cón thể đánh giá lại?
});

module.exports = Review;
