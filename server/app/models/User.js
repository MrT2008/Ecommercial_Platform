const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [6, 999],
    }
  },
  fullName: {
    type: DataTypes.STRING,
    defaultValue: 'user'+Date.now()+Math.floor(Math.random()*1000),
  },
  banReason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  imageURL: {
    type: DataTypes.STRING,
    validate: {
        isURL: true,
        notEmpty: true
    },
    defaultValue: 'https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png',
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      console.log(`[USER CREATED] ${user.email}`);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        console.log(`[USER UPDATED] ${user.email}`);
      }
    },
  }
});

module.exports = User;