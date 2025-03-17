const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Product = require('./Product')
const Category = require('./Category')

class ProductCategory extends Model {}

ProductCategory.init({
    id: { 
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: "productId"
        }
    },
    categoryID: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: "categoryId"
        }
    }
}, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'product_categories',
    timestamps: true,
})

module.exports = ProductCategory