const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../configs/configDB');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
  },
}, {
  tableName: 'users',
  timestamps: true, // automatically adds createdAt and updatedAt
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    },
    afterCreate: (user) => {
      console.log('Created user:', user.email);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {  // re-hash if password is modified
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    afterUpdate: (user) => {
      console.log('After updating user:', user.email);
    },
    beforeDestroy: (user) => {
      console.log('Before deleting user:', user.email);
    },
    afterDestroy: (user) => {
      console.log('After deleting user:', user.email);
    },
  }
});

User.login = async function (email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Incorrect email');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  return user;
};

module.exports = User;