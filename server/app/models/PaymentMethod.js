const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User');

class PaymentMethod extends Model {}

PaymentMethod.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bankName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 999]
        }
    },
    bankAccountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 999]
        }
    },
    inUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: User,
          key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'PaymentMethod',
    tableName: 'payment_methods',
    timestamps: true,
});

module.exports = PaymentMethod;