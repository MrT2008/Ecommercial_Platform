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

    /*Trên erd có foreign key của transaction nhưng shipinfo vs transaction k có mqh nào hết? */
    // transactionID: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'transactions',
    //         key: 'transactionID'
    //     }
    // },

    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'userId',
        },
    },
    inUsed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    receiverName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 999]
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
}, {
    sequelize,
    modelName: 'ShipInfo',
    tableName: 'ship_infos',
    timestamps: true,
});

module.exports = ShipInfo;