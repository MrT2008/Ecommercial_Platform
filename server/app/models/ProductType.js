const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Product = require('./Product')
const Category = require('./Category')

class ProductType extends Model {}

ProductType.init({
    productID: { 
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: "productID"
        }
    },
    categoryID: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: "categoryID"
        }
    }
}, {
    sequelize,
    modelName: 'ProductTypes',
    timestamps: true,
})

module.exports = ProductType