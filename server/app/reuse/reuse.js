const crypto = require("crypto");
const { models } = require("../models");
const sendGmailToUser = require("../utilities/sendGmail");
const sequelize = require("sequelize");
const OrderDetail = require("../models/OrderDetail");
const { error } = require("console");
const { get } = require("http");
const { all } = require("../../routes/buyer");

// FEATURES MANAGEMENT
const sentAnnouncement = async (senderId, title, imageURL, script, options = {}) => {
  try {
    const announcement = await models.Announcement.create(
      {
        senderId,
        title,
        imageURL,
        script,
      },
      options
    );

    return announcement;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const getAllAnnouncements = async () => {
  return await models.Announcement.findAll({
    include: { model: models.User, as: "sender" },
  });
};

const editAnnouncementById = async (id, title, imageURL, script) => {
  try {
    const announcement = await models.Announcement.findByPk(id);
    if (!announcement) {
      return { error: "Announcement not found" };
    }

    await announcement.update({
      title: title || announcement.title,
      imageURL: imageURL || announcement.imageURL,
      script: script || announcement.script,
    });

    return announcement;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const deleteAnnouncementById = async (id) => {
  try {
    const announcement = await models.Announcement.findByPk(id);
    if (!announcement) {
      return { error: "Announcement not found" };
    }

    await announcement.update({ isActive: false });

    return { message: "Announcement deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const getAnnouncementsBySenderId = async (senderId) => {
  return await models.Announcement.findAll({
    where: { senderId },
    include: { model: models.User, as: "sender" },
  });
};

// SHOP MANAGEMENT
const getAllShops = async (req) => {
  const shops = await models.Shop.findAll();
  const allShops = [];
  for (const shop of shops) {
    if (shop.avatarUrl) {
      shop.avatarUrl = shop.avatarUrl.replace(/^.*[\\\/]public[\\\/]/, "/"); // Normalize the path
      shop.avatarUrl = `${req.protocol}://${req.get("host")}/${shop.avatarUrl}`;
    }
    if (shop.backgroundUrl) {
      shop.backgroundUrl = shop.backgroundUrl.replace(/^.*[\\\/]public[\\\/]/, "/"); // Normalize the path
      shop.backgroundUrl = `${req.protocol}://${req.get("host")}/${shop.backgroundUrl}`;
    }
    const orderDetails = await models.OrderDetail.findAll({
      where: { shopId: shop.id },
      include: {
        model: models.Review,
        as: "reviewProduct",
        attributes: ["rating"],
        required: true,
      },
    });
    allShops.push({
      ...shop.toJSON(),
      totalRating:
        orderDetails.reduce((acc, item) => acc + item.reviewProduct.rating, 0) /
          orderDetails.length || 0,
      totalEvaluations: orderDetails.length,
      totalProducts: await models.Product.count({ where: { shopId: shop.id } }),
    });
  }
  return allShops;
};

const getShopById = async (id, req) => {
  const shop = await models.Shop.findByPk(id);
  const shopDetails = [];
  if (shop.avatarUrl) {
    shop.avatarUrl = shop.avatarUrl.replace(/^.*[\\\/]public[\\\/]/, "/"); // Normalize the path
    shop.avatarUrl = `${req.protocol}://${req.get("host")}/${shop.avatarUrl}`;
  }
  if (shop.backgroundUrl) {
    shop.backgroundUrl = shop.backgroundUrl.replace(/^.*[\\\/]public[\\\/]/, "/"); // Normalize the path
    shop.backgroundUrl = `${req.protocol}://${req.get("host")}/${shop.backgroundUrl}`;
  }
  const orderDetails = await models.OrderDetail.findAll({
    where: { shopId: shop.id },
    include: {
      model: models.Review,
      as: "reviewProduct",
      attributes: ["rating"],
      required: true,
    },
  });
  shopDetails.push({
    ...shop.toJSON(),
    totalRating:
      orderDetails.reduce((acc, item) => acc + item.reviewProduct.rating, 0) /
        orderDetails.length || 0,
    totalEvaluations: orderDetails.length,
    totalProducts: await models.Product.count({ where: { shopId: shop.id } }),
  });

  return shopDetails;
};

const getAllActiveShops = async () => {
  const activeShops = await models.Shop.findAll({ where: { status: "active" } });
  const inactiveShops = await models.Shop.findAll({ where: { status: "inactive" } });

  const shops = activeShops.concat(inactiveShops); // show shops which is not banned or pending status first
  shops.sort((a, b) => a.id - b.id);
  return shops;
};

const getAllPendingShops = async () => {
  return await models.Shop.findAll({ where: { status: "pending" } });
};

const getAllBannedShops = async () => {
  return await models.Shop.findAll({ where: { status: "banned" } });
};

const registerShop = async (
  userId,
  name,
  description,
  address,
  phone,
  email,
  bankName,
  bankAccount,
  options = {}
) => {
  try {
    const shop = await models.Shop.create(
      {
        userId,
        name,
        description,
        address,
        phone,
        email,
        bankName,
        bankAccount,
      },
      options
    );

    return shop;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const approveShopById = async (id, options = {}) => {
  try {
    const shop = await models.Shop.findByPk(id);
    if (!shop) {
      return { error: "Shop not found" };
    }

    if (shop.status === "active") {
      return { message: "Shop is already active", shop };
    }

    const sellerRole = await models.UserRole.create({
      userId: shop.ownerId,
      roleId: 4,
    });

    const updatedShop = await shop.update(
      {
        status: "active",
      },
      options
    );

    return updatedShop, sellerRole;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const rejectShopById = async (id, options = {}) => {
  try {
    const shop = await models.Shop.findByPk(id);
    if (!shop) {
      return { error: "Shop not found" };
    }

    if (shop.status === "inactive") {
      return { message: "Shop is already inactive", shop };
    }

    await shop.update(
      {
        status: "inactive",
      },
      options
    );

    return { message: "Shop rejected successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const banShopById = async (id, reason, options = {}) => {
  try {
    const shop = await models.Shop.findByPk(id);
    if (!shop) {
      return { error: "Shop not found" };
    }

    if (shop.status === "banned") {
      return { message: "Shop is already banned", shop };
    }

    const updatedShop = await shop.update(
      {
        status: "banned",
        banReason: reason,
      },
      options
    );

    return updatedShop;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const unbanShopById = async (id, options = {}) => {
  try {
    const shop = await models.Shop.findByPk(id);
    if (!shop) {
      return { error: "Shop not found" };
    }

    if (shop.status === "active") {
      return { message: "Shop is already active", shop };
    }

    const updatedShop = await shop.update(
      {
        status: "active",
        banReason: null,
      },
      options
    );

    return updatedShop;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const getAverageRatingsByShopId = async (shopId) => {
  try {
    const shopProductSolds = await models.OrderDetail.findAll({
      where: { shopId },
      include: {
        model: models.Review,
        as: "reviewProduct",
        attributes: ["rating"],
        required: true,
      },
    });

    // If there are no reviews, return null or 0 as appropriate
    if (shopProductSolds.length === 0) return 0;

    // Calculate average
    const totalRating = shopProductSolds.reduce((sum, item) => {
      return sum + item.reviewProduct.rating;
    }, 0);

    const averageRating = totalRating / shopProductSolds.length;

    return averageRating;
  } catch (err) {
    console.error("Failed to get average ratings:", err);
    throw err;
  }
};

const getTotalEvaluationsByShopId = async (shopId) => {
  try {
    const shopProductSolds = await models.OrderDetail.findAll({
      where: { shopId },
      include: {
        model: models.Review,
        as: "reviewProduct",
        attributes: ["rating"],
        required: true,
      },
    });

    return shopProductSolds.length === 0 ? 0 : shopProductSolds.length;
  } catch (error) {
    console.error("Error fetching total evaluations:", error);
    return 0;
  }
};

const getTotalProductsByShopId = async (shopId) => {
  try {
    const count = await models.Product.count({
      where: { shopId },
    });

    return count;
  } catch (error) {
    console.error("Error fetching total products:", error);
    return 0;
  }
};

// PRODUCT MANAGEMENT
const getProducts = async (products, req) => {
  const allProducts = [];
  for (const product of products) {
    if (product.thumbnailURL && !product.thumbnailURL.startsWith("http")) {
      product.thumbnailURL = product.thumbnailURL.replace(/^.*[\\\/]public[\\\/]/, "/"); // Normalize the path
      product.thumbnailURL = `${req.protocol}://${req.get("host")}/${product.thumbnailURL}`;
    }
    const categories = await models.ProductCategory.findAll({ where: { productId: product.id } });
    const categoryNames = [];
    for (const category of categories) {
      const categoryData = await models.Category.findOne({ where: { id: category.categoryId } });
      if (categoryData) {
        categoryNames.push(categoryData.name);
      }
    }
    const reviewProduct = await models.Review.findAll({ where: { productId: product.id } });
    const totalRating = reviewProduct.reduce((acc, review) => acc + review.rating, 0);

    allProducts.push({
      ...product.toJSON(),
      categories: categoryNames,
      totalRating: totalRating / reviewProduct.length || 0,
    });
  }
  return allProducts;
};

const getProductById = async (id) => {
  return await models.Product.findByPk(id);
};

const banProductById = async (id, reason, options = {}) => {
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      return { error: "Product not found" };
    }

    if (product.status === "banned") {
      return { message: "Product is already banned", product };
    }

    const updatedProduct = await product.update(
      {
        status: "banned",
        banReason: reason,
      },
      options
    );

    return updatedProduct;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const unbanProductById = async (id, options = {}) => {
  try {
    const product = await models.Product.findByPk(id);
    if (!product) {
      return { error: "Product not found" };
    }

    if (product.status === "active") {
      return { message: "Product is already active", product };
    }

    const updatedProduct = await product.update(
      {
        status: "active",
        banReason: null,
      },
      options
    );

    return updatedProduct;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

// USER MANAGEMENT
const getAllUserByRole = async (role) => {
  try {
    const modRoleId = await models.Role.findOne({ where: { name: role } });
    if (!modRoleId) {
      return { error: "Role not found" };
    }

    const userRoles = await models.UserRole.findAll({
      where: { roleId: modRoleId.id },
    });

    const moderators = await Promise.all(
      userRoles.map(async (userRole) => {
        return await models.User.findOne({
          where: {
            id: userRole.userId,
            isActive: true,
          },
        });
      })
    );

    // Remove any nulls (users not found or not active)
    const activeModerators = moderators.filter((user) => user !== null);

    return activeModerators;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const getAllActiveUsers = async () => {
  return await models.User.findAll({ where: { isActive: true } });
};

const banUserById = async (id, reason, options = {}) => {
  try {
    const user = await models.User.findByPk(id, options);
    if (!user) {
      return { error: "User not found" };
    }

    if (user.isBanned) {
      return { message: "User is already banned", user };
    }

    const updatedUser = await user.update({ isActive: false, banReason: reason }, options);

    return updatedUser;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const updateUserPassword = async (id, newPassword) => {
  const user = await models.User.findByPk(id);
  if (!user) {
    return { error: "User not found" };
  }

  await user.update({ password: newPassword });

  return user;
};

const refreshUserPassworkById = async (id) => {
  try {
    const user = await models.User.findByPk(id);
    if (!user) {
      return { error: "User not found" };
    }

    const newPassword = crypto.randomBytes(6).toString("base64");

    const updatedUser = await user.update({ password: newPassword });

    await sendGmailToUser(
      user.email,
      "Your Password Has Been Reset",
      `Hello ${user.username},\n\nYour password has been reset. Your new password is: ${newPassword}\n\nPlease change it after logging in for security reasons.`
    );

    return updatedUser;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const getUserById = async (id) => {
  return await models.User.findByPk(id);
};

// PROMOTION MANAGEMENT
const getAllPromotions = async () => {
  return await models.Promotion.findAll();
};

const getPromotionById = async (id) => {
  return await models.Promotion.findByPk(id);
};

const createPromotion = async (shopId, title, imageURL, script, options = {}) => {
  try {
    const promotion = await models.Promotion.create(
      {
        shopId,
        title,
        imageURL,
        script,
      },
      options
    );

    return promotion;
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

const deletePromotionById = async (id, reason) => {
  try {
    const promotion = await models.Promotion.findByPk(id);
    if (!promotion) {
      return { error: "Promotion not found" };
    }

    await promotion.update({ isActive: false, banReason: reason });

    return { message: "Promotion deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Internal Server Error" };
  }
};

// PRODUCT MANAGEMENT
const getAllActiveProducts = async () => {
  return await models.Product.findAll({ where: { status: "active" } });
};

const getTotalSales = async () => {
  try {
    const totalSales = await models.OrderDetail.sum("totalPrice", {
      where: { status: "completed" },
    });
    return totalSales || 0;
  } catch (error) {
    console.error("Error fetching total sales:", error);
    return 0;
  }
};

const totalProductsSold = async () => {
  try {
    const totalProductsSold = await models.OrderDetail.sum("quantity", {
      where: { status: "completed" },
    });
    return totalProductsSold || 0;
  } catch (error) {
    console.error("Error fetching total products sold:", error);
    return 0;
  }
};

module.exports = {
  sentAnnouncement,
  getAllAnnouncements,
  editAnnouncementById,
  deleteAnnouncementById,
  getAnnouncementsBySenderId,
  getAllShops,
  getShopById,
  getAllActiveShops,
  getAllPendingShops,
  getAllBannedShops,
  registerShop,
  approveShopById,
  rejectShopById,
  banShopById,
  unbanShopById,
  getAverageRatingsByShopId,
  getTotalEvaluationsByShopId,
  getTotalProductsByShopId,
  getProducts,
  getProductById,
  banProductById,
  unbanProductById,
  getAllUserByRole,
  getAllActiveUsers,
  banUserById,
  updateUserPassword,
  refreshUserPassworkById,
  getUserById,
  getAllPromotions,
  getPromotionById,
  createPromotion,
  deletePromotionById,
  getAllActiveProducts,
  getTotalSales,
  totalProductsSold,
  getAllAnnouncements,
  getAllActiveShops,
  getAllPendingShops,
  getAllBannedShops,
  getAllActiveUsers,
  getAllPromotions,
  getAllActiveProducts,
  getTotalSales,
  totalProductsSold,
  getProducts,
};
