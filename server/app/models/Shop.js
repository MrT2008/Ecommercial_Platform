const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');

class Shop extends Model {}

Shop.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ownerID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId',
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[0-9]{10,11}$/,
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 999]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true,
        }
    },
    theme: {
        type: DataTypes.STRING,
        defaultValue: '#FFFFFF',
    },
}, {
    sequelize,
    modelName: 'Shop',
    tableName: 'shops',
    timestamps: true,
});

module.exports = Shop;