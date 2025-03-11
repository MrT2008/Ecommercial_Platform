const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/dbConfig');
const bcrypt = require('bcrypt');

class User extends Model {
  static async login(email, password) {
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
}

User.init({
  userID: {
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
  name: {
    type: DataTypes.STRING,
    defaultValue: 'user'+Date.now()+Math.floor(Math.random()*1000),
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^[0-9]{10,11}$/,
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true, // Only for Google users
  },
  userStatus: {
    type: DataTypes.ENUM('active', 'ban'),
    defaultValue: 'active',
},
  imageURL: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isURL: true,
        notEmpty: true
    }
  }
}, {
  sequelize,
  modelName: 'Users',
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
  }
});

module.exports = User;