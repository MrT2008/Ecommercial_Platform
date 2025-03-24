const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');

class Shop extends Model {}

Shop.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        references: {
          model: User,
          key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    theme: {
        type: DataTypes.STRING,
        defaultValue: '#FFFFFF',
    },
    banReason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Shop',
    tableName: 'shops',
    timestamps: true,
});

module.exports = Shop;