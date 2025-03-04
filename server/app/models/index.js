const sequelize = require('../configs/dbConfig');
const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync();
    console.log('Database synced!');
  } catch (err) {
    console.error('Database connection or sync failed:', err);
  }
};

const User = require('./User');
const Role = require('./Role');
const UserRole = require('./UserRole');
const Shop = require('./Shop');
const Product = require('./Product');
const Order = require('./Order');
const Review = require('./Review');
const Transaction = require('./Transaction');

const models = {
  User,
  Role,
  UserRole,
  Shop,
  Product,
  Order,
  Review,
  Transaction,
};

// User N-M Role
User.belongsToMany(Role, { through: UserRole, foreignKey: "userID" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "roleID" });

// User 1-1 Shop
User.hasOne(Shop, { foreignKey: "ownerID" });
Shop.belongsTo(User, { foreignKey: "ownerID" });

// Shop 1-N Product
Shop.hasMany(Product, { foreignKey: "shopID" });
Product.belongsTo(Shop, { foreignKey: "shopID" });

// User 1-N Order
User.hasMany(Order, { foreignKey: "buyerID" });
Order.belongsTo(User, { foreignKey: "buyerID" });

// User 1-N Review, Product 1-N Review
User.hasMany(Review, { foreignKey: "userID" });
Product.hasMany(Review, { foreignKey: "productID" });
Review.belongsTo(User, { foreignKey: "userID" });
Review.belongsTo(Product, { foreignKey: "productID" });


// Order 1-N Transaction
Order.hasMany(Transaction, { foreignKey: 'orderID' });
Transaction.belongsTo(Order, { foreignKey: 'orderID' });

module.exports = { models, syncModels };