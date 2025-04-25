const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const { now } = require('sequelize/lib/utils');
const User = require('./User')

class ShipInfo extends Model {}

ShipInfo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'delete'),
        defaultValue: 'inactive',
        validate: {
            isIn: [['active', 'inactive', 'delete']],
        }
    },
    receiverName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 999]
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 999]
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[0-9]{10,11}$/,
        },
      },
}, {
    sequelize,
    modelName: 'ShipInfo',
    tableName: 'ship_infos',
    timestamps: true,
});

module.exports = ShipInfo;