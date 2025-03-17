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
            key: "userId"
        }
    },
    paymentID: {
        type: DataTypes.INTEGER,
        references: {
            model: PaymentMethod,
            key: "paymentMethodId"
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
    modelName: 'UserPayment',
    tableName: 'user_payments',
    timestamps: true,
})

module.exports = UserPayment