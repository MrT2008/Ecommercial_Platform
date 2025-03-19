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
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        references: {
          model: 'users',
          key: 'id',
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
    banReason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isURL: true,
        }
    },
}, {
    sequelize,
    modelName: 'Shop',
    tableName: 'shops',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['ownerId', 'id']
        }
    ]
});

module.exports = Shop;