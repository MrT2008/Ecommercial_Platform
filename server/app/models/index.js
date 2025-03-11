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
const ProductType = require('./ProductType')

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

// Order N-M Product via OrderDetail
Order.belongsToMany(Product, { through: OrderDetail, foreignKey: "orderID", onDelete: 'CASCADE' });
Product.belongsToMany(Order, { through: OrderDetail, foreignKey: "productID", onDelete: 'CASCADE' });
OrderDetail.belongsTo(Order, { foreignKey: "orderID", onDelete: 'CASCADE' });
OrderDetail.belongsTo(Product, { foreignKey: "productID", onDelete: 'CASCADE' });

// User N-M Product (via Cart)
Product.belongsToMany(User, { through: Cart, foreignKey: "productID", onDelete: 'CASCADE' });
User.belongsToMany(Product, { through: Cart, foreignKey: "userID", onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: "userID", onDelete: 'CASCADE' });
Cart.belongsTo(Product, { foreignKey: "productID", onDelete: 'CASCADE' });

// User 1-N Review, Product 1-N Review
User.hasMany(Review, { foreignKey: "userID" });
Product.hasMany(Review, { foreignKey: "productID" });
Review.belongsTo(User, { foreignKey: "userID" });
Review.belongsTo(Product, { foreignKey: "productID" });

// Order 1-N Transaction
Order.hasMany(Transaction, { foreignKey: 'orderID' });
Transaction.belongsTo(Order, { foreignKey: 'orderID' });

//User N-M PaymentMethod (via UserPayment)
User.belongsToMany(PaymentMethod, {through: UserPayment, foreignKey: "userID", onDelete: 'CASCADE'});
PaymentMethod.belongsToMany(User, {through: UserPayment, foreignKey: "paymentMethodID", onDelete: 'CASCADE'});
UserPayment.belongsTo(User, {foreignKey: "userID", onDelete: 'CASCADE'});
UserPayment.belongsTo(PaymentMethod, {foreignKey: "paymentMethodID", onDelete: 'CASCADE'});

//User 1-N ShipInfo
User.hasMany(ShipInfo, {foreignKey: "userID"});
ShipInfo.belongsTo(User, {foreignKey: "userID"});

//User 1-N Announcement
User.hasMany(Announcement, {foreignKey: "userID"});
Announcement.belongsTo(User, {foreignKey: "userID"});

//Product N-M Category (via ProductType)
Product.belongsToMany(Category, {through: ProductType, foreignKey: "productID", onDelete: 'CASCADE'});
Category.belongsToMany(Product, {through: ProductType, foreignKey: "categoryID", onDelete: 'CASCADE'});
ProductType.belongsTo(Product, {foreignKey: "productID", onDelete: 'CASCADE'});
ProductType.belongsTo(Category, {foreignKey: "categoryID", onDelete: 'CASCADE'});

//Shop 1-N Category
Shop.hasMany(Category, {foreignKey: "shopID"});
Category.belongsTo(Shop, {foreignKey: "shopID"});

//Shop 1-N Promotion
Shop.hasMany(Promotion, {foreignKey: "shopID"});
Promotion.belongsTo(Shop, {foreignKey: "shopID"})

module.exports = { models, syncModels };