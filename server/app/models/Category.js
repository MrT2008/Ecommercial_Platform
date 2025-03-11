const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const Shop = require('./Shop')

class Category extends Model {}

Category.init({
    categoryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    //ERD k có nhưng tui thêm vô để có 1-N 
    shopID: {
        type: DataTypes.INTEGER,
        references: {
            model: Shop,
            key: 'shopID'
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
    modelName: 'Categories',
    timestamps: true,
});

module.exports = Category;