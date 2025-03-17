const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');

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
}, {
    sequelize,
    modelName: 'PaymentMethod',
    tableName: 'payment_methods',
    timestamps: true,
});

module.exports = PaymentMethod;