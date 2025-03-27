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
    bankName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bankAccount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    theme: {
        type: DataTypes.STRING,
        defaultValue: '#FFFFFF',
    },
    avatarUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconfinder.com%2Ficons%2F6169232%2Favatar_owner_profile_seller_shop_store_user_icon&psig=AOvVaw0uojWZayepUMT25TbhYG6g&ust=1742881035319000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKCm7Pn_oYwDFQAAAAAdAAAAABAE',
    },
    backgroundUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Ffree-backgrounds-photos%2Fshopping&psig=AOvVaw1ol3BQfDqiiWgizAjmdpI3&ust=1742881069840000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDsxoqAoowDFQAAAAAdAAAAABAI'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'banned', 'pending'),
        defaultValue: 'pending',
        allowNull: false,
    },
    banReason: {
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