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
const OrderDetail = require('./OrderDetail');
const Cart = require('./Cart');
const Review = require('./Review');
const Transaction = require('./Transaction');
const Announcement = require('./Announcement');
const Category = require('./Category');
const PaymentMethod = require('./PaymentMethod');
const Promotion = require('./Promotion');
const ShipInfo = require('./ShipInfo');
const UserPayment = require('./UserPayment')
const ProductType = require('./ProductCategory')

const models = {
  User,
  Role,
  UserRole,
  Shop,
  Product,
  Order,
  OrderDetail,
  Cart,
  Review,
  Transaction,
  Announcement,
  Category,
  PaymentMethod,
  Promotion,
  ShipInfo,
  UserPayment,
  ProductType,
};


// User N-M Role via UserRole
User.belongsToMany(Role, { 
  through: UserRole, 
  foreignKey: "userID",
  otherKey: "roleID",
  as: "roles"
});
Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "roleID",
  otherKey: "userID",
  as: "users"
});


//User 1-N Announcement
User.hasMany(Announcement, {foreignKey: "userID"});
Announcement.belongsTo(User, {foreignKey: "userID"});

// User 1-1 Shop
User.hasOne(Shop, { foreignKey: "ownerID", as: 'shop' });
Shop.belongsTo(User, { foreignKey: "ownerID", as: 'owner' });



module.exports = { models, syncModels };