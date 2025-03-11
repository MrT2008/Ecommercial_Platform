const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const User = require('./User')
const PaymentMethod = require('./PaymentMethod')

class UserPayment extends Model {}

UserPayment.init({
    userID: { 
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "userID"
        }
    },
    paymentID: {
        type: DataTypes.INTEGER,
        references: {
            model: PaymentMethod,
            key: "paymentMethodID"
        }
    },
    bankAccount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
}, {
    sequelize,
    modelName: 'UserPayments',
    timestamps: true,
})

module.exports = UserPayment