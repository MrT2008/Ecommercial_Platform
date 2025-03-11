const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');

class PaymentMethod extends Model {}

PaymentMethod.init({
    paymentMethodID: {
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
    inUsed: {
        type: DataTypes.BOOLEAN
    },
}, {
    sequelize,
    modelName: 'PaymentMethods',
    timestamps: true,
});

module.exports = PaymentMethod;