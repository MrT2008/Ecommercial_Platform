const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Shop = require('./Shop')

class Category extends Model {}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shopID: {
        type: DataTypes.INTEGER,
        references: {
            model: Shop,
            key: 'shopId'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
});

module.exports = Category;