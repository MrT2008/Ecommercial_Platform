const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../configs/dbConfig');

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
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('manager', 'moderator', 'buyer'),
    defaultValue: 'buyer',
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true, // Only for Google users
  },
}, {
  tableName: 'users',
  timestamps: true, // automatically adds createdAt and updatedAt
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
      console.log(`[USER CREATED] ${user.email}`);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {  // re-hash if password is modified
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        console.log(`[USER UPDATED] ${user.email}`);
      }
    },
    afterCreate: (user) => console.log(`[USER CREATED] ${user.email}`),
    afterUpdate: (user) => console.log(`[USER UPDATED] ${user.email}`),
    afterDestroy: (user) => console.log(`[USER DELETED] ${user.email}`),
  }
});

User.login = async function (email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Incorrect email");
    console.log(`[USER LOGIN] ${user.email}`);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Incorrect password");

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = User;