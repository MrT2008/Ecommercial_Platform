const bcrypt = require('bcrypt');
const Announcement = require('../models/Announcement');
const Cart = require('../models/Cart');
const Category = require('../models/Category');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const PaymentMethod = require('../models/PaymentMethod');
const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory')
const Promotion = require('../models/Promotion');
const Review = require('../models/Review');
const Role = require('../models/Role');
const ShipInfo = require('../models/ShipInfo');
const Shop = require('../models/Shop');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const UserRole = require('../models/UserRole');

const sequelize = require('./dbConfig');
const e = require('express');

const NUM_MODERATORS = 5;
const NUM_TOTAL_USERS = 100;
const NUM_BUYER_SELLERS = 50; // out of 94 buyers

const DEFAULT_PASSWORD = 'password123';
const DEFAULT_AVATAR = 'https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png';
const DEFAULT_BACKGROUND = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-980350_1280.png';

const createUsers = async () => {
  const t = await sequelize.transaction();
  try {
    const roles = ['manager', 'moderator', 'buyer', 'seller'];
        for (const role of roles) {
            await Role.create({ name: role });
        }
    
    const [managerRole, moderatorRole, buyerRole, sellerRole] = await Promise.all([
      Role.findOne({ where: { name: 'manager' } }),
      Role.findOne({ where: { name: 'moderator' } }),
      Role.findOne({ where: { name: 'buyer' } }),
      Role.findOne({ where: { name: 'seller' } }),
    ]);

    if (!managerRole || !moderatorRole || !buyerRole || !sellerRole) {
      throw new Error('One or more roles not found. Make sure to run role seed script first.');
    }

    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    let userId = 1;

    // === Create Manager ===
    const manager = await User.create({
      email: `manager@gmail.com`,
      password: hashedPassword,
      username: `manager_user`,
      profileImage: DEFAULT_AVATAR,
      isActive: 1,
    }, { transaction: t });
    await UserRole.create({ userId: manager.id, roleId: managerRole.id }, { transaction: t });
    userId++;

    // === Create 5 Moderators ===
    for (let i = 1; i <= NUM_MODERATORS; i++) {
      const mod = await User.create({
        email: `moderator${i}@gmail.com`,
        password: hashedPassword,
        username: `moderator_${i}`,
        profileImage: DEFAULT_AVATAR,
        isActive: 1,
      }, { transaction: t });

      await UserRole.create({ userId: mod.id, roleId: moderatorRole.id }, { transaction: t });
      userId++;
    }

    // === Create 50 Buyers who are also Sellers ===
    for (let i = 1; i <= NUM_BUYER_SELLERS; i++) {
        const user = await User.create({
            email: `user${userId}@gmail.com`,
            password: hashedPassword,
            username: `buyer_seller_${userId}`,
            profileImage: DEFAULT_AVATAR,
            isActive: 1,

    }, { transaction: t });

    // await Shop.create({
    //     ownerId: user.id,
    //     name: `Shop_${userId}`,
    //     phone: `123456789${userId}`,
    //     address: `Shop address for user ${userId}`,
    //     email: `shop${userId}@gmail.com`,
    //     bankName: `Bank Name ${userId}`,
    //     bankAccount: `1234${userId}`,
    //     description: `Shop description for user ${userId}`,
    //     avatarUrl: DEFAULT_AVATAR,
    //     backgroundUrl: DEFAULT_BACKGROUND,
    //     isActive: 1,
    //     isDeleted: 0,
    // });

      await UserRole.bulkCreate([
        { userId: user.id, roleId: buyerRole.id },
        { userId: user.id, roleId: sellerRole.id },
      ], { transaction: t });

      userId++;
    }

    // === Create remaining 44 Buyers (buyer-only) ===
    for (let i = 1; i <= (NUM_TOTAL_USERS - userId + 1); i++) {
      const user = await User.create({
        email: `user${userId}@gmail.com`,
        password: hashedPassword,
        username: `buyer_${userId}`,
        profileImage: DEFAULT_AVATAR,
        isActive: 1,
      }, { transaction: t });

      await UserRole.create({ userId: user.id, roleId: buyerRole.id }, { transaction: t });

      userId++;
    }

    await t.commit();
    console.log('✅ 100 users created successfully');
  } catch (error) {
    await t.rollback();
    console.error('❌ Error creating users:', error);
  } finally {
    await sequelize.close();
  }
};

createUsers();
