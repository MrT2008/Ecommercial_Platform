const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Product = require('./Product')
const Category = require('./Category')

class ProductCategory extends Model {}

ProductCategory.init({
    productId: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Product,
            key: "id"
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Category,
            key: "id"
        }
    },
}, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'product_categories',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['productId', 'categoryId']
        }
    ]
})

module.exports = ProductCategory;