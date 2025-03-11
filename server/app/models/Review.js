const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');
const Product = require('./Product');

class Review extends Model {}

Review.init({
    reviewID: {
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
    },
    productID: {
        type: DataTypes.INTEGER,
        references: {  
            model: Product,
            key: 'productID',
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
    imageURL: {
        type: DataTypes.STRING,
        validate: {
            isURL: true
        }
    },
}, {
    sequelize,
    modelName: 'Reviews',
    timestamps: true,
});

module.exports = Review;
