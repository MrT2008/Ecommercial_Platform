const sequelize = require('../configs/dbConfig');

const Announcement = require('./Announcement');
const Cart = require('./Cart');
const Category = require('./Category');
const Order = require('./Order');
const OrderDetail = require('./OrderDetail');
const PaymentMethod = require('./PaymentMethod');
const Product = require('./Product');
const ProductCategory = require('./ProductCategory')
const Promotion = require('./Promotion');
const Review = require('./Review');
const Role = require('./Role');
const ShipInfo = require('./ShipInfo');
const Shop = require('./Shop');
const Transaction = require('./Transaction');
const User = require('./User');
const UserRole = require('./UserRole');

const models = {
  Announcement,
  Cart,
  Category,
  Order,
  OrderDetail,
  PaymentMethod,
  Product,
  ProductCategory,
  Promotion,
  Review,
  Role,
  ShipInfo,
  Shop,
  Transaction,
  User,
  UserRole,
};

// User 1-N Announcement (as Sender)
User.hasMany(Announcement, { foreignKey: 'senderId', as: 'sentAnnouncements'});
Announcement.belongsTo(User, { foreignKey: 'senderId', as: 'sender'});

// User 1-1 Shop
User.hasOne(Shop, { foreignKey: "ownerId", as: 'shop',unique: true, onDelete: 'CASCADE' });
Shop.belongsTo(User, { foreignKey: "ownerId", as: 'owner',unique: true });

// User 1-N PaymentMethod
User.hasMany(PaymentMethod, { foreignKey: "userId", as: 'paymentMethods' });
PaymentMethod.belongsTo(User, { foreignKey: "userId", as: 'user' });

// User 1-N ShipInfo
User.hasMany(ShipInfo, { foreignKey: "userId", as: 'shipInfos' });
ShipInfo.belongsTo(User, { foreignKey: "userId", as: 'user' });

// User 1-N Order
User.hasMany(Order, { foreignKey: "buyerId", as: 'orders' });
Order.belongsTo(User, { foreignKey: "buyerId", as: 'user' });

// User N-M Role via UserRole
User.belongsToMany(Role, { 
  through: UserRole, 
  foreignKey: "userId",
  otherKey: "roleId",
  as: "roles"
});
Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "roleId",
  otherKey: "userId",
  as: "users"
});

// User N-M Product via Cart
User.belongsToMany(Product, { 
  through: Cart, 
  foreignKey: "userId",
  otherKey: "productId",
  as: "products"
});
Product.belongsToMany(User, {
  through: Cart,
  foreignKey: "productId",
  otherKey: "userId",
  as: "users"
});

// User 1:N Review
User.hasMany(Review, { foreignKey: "buyerId", as: 'reviews' });
Review.belongsTo(User, { foreignKey: "buyerId", as: 'reviewer' });

// Shop 1-N Product
Shop.hasMany(Product, { foreignKey: "ownerId", as: 'products' });
Product.belongsTo(Shop, { foreignKey: "ownerId",as: 'shop' });

// Shop 1-N Category
Shop.hasMany(Category, { 
  foreignKey: "shopId",
  as: 'categories'});
Category.belongsTo(Shop, { 
  foreignKey: "shopId",
  as: 'shop' });

// Shop 1-N Promotion
Shop.hasMany(Promotion, { 
  foreignKey: "shopId",
  as: 'promotions' });
Promotion.belongsTo(Shop, { 
  foreignKey: "shopId", 
  as: 'shop' });

// Order N-M Product via OrderDetail
Order.belongsToMany(Product, { 
  through: OrderDetail, 
  foreignKey: "orderId",
  otherKey: "productId",
  as: "products"
});
Product.belongsToMany(Order, {
  through: OrderDetail,
  foreignKey: "productId",
  otherKey: "orderId",
  as: "orders"
});

// Order 1-N Transaction
Order.hasMany(Transaction, { foreignKey: "orderId",as: 'transactions' });
Transaction.belongsTo(Order, { foreignKey: "orderId",as: 'order' });

// Product N-M Category via ProductCategory
Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: "productId",
  otherKey: "categoryId",
  as: "categories"
});
Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: "categoryId",
  otherKey: "productId",
  as: "products"
});

// Review 1-1 OrderDetail
OrderDetail.hasOne(Review, {
  foreignKey: 'orderId',
  as: 'reviewOrder',
  constraints: false,
});
OrderDetail.hasOne(Review, {
  foreignKey: 'productId',
  as: 'reviewProduct',
  constraints: false,
});
Review.belongsTo(OrderDetail, {
  foreignKey: 'productId',
  as: 'orderDetailByProduct',
  constraints: false,
});
Review.belongsTo(OrderDetail, {
  foreignKey: 'orderId',
  as: 'orderDetailByOrder',
  constraints: false,
});

const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync({force: false}); // Set to true to drop and recreate tables
    console.log('Database synced!');
  } catch (err) {
    console.error('Database connection or sync failed:', err);
  }
};

module.exports = { models, syncModels };