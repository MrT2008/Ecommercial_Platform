const { models } = require("../models");
const reuse = require("../reuse/reuse");

class ModeratorController {
  // Featured Announcement Management
  sendAnnouncement = async (req, res) => {
    const t = await models.Announcement.sequelize.transaction();
    try {
      const { title, imageURL, script } = req.body;
      const senderId = req.user.id;

      const announcement = await reuse.sentAnnouncement(senderId, title, imageURL, script, {
        transaction: t,
      });
      if (announcement.error) {
        await t.rollback();
        return res.status(404).json({ error: announcement.error });
      }

      await t.commit();

      res.status(201).json({ message: "Announcement sent successfully", announcement });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getAllAnnouncements = async (req, res) => {
    try {
      const announcements = await reuse.getAllAnnouncements();
      res.status(200).json({ message: "Announcements retrieved successfully", announcements });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  editAnnouncementById = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, imageURL, script } = req.body;

      const editedAnnouncement = await reuse.editAnnouncementById(id, title, imageURL, script);
      if (editedAnnouncement.error) {
        return res.status(404).json({ error: editedAnnouncement.error });
      }

      res.status(200).json({ message: "Announcement edited successfully", editedAnnouncement });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  deleteAnnouncementById = async (req, res) => {
    try {
      const { id } = req.params;

      const deletedAnnouncement = await reuse.deleteAnnouncementById(id);
      if (deletedAnnouncement.error) {
        return res.status(404).json({ error: deletedAnnouncement.error });
      }

      res.status(200).json({ message: "Announcement deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getAllAnnouncementsByManager = async (req, res) => {
    try {
      const announcements = await reuse.getAnnouncementsBySenderId(req.user.id);
      res.status(200).json({ message: "Announcements retrieved successfully", announcements });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getAnnouncementsBySenderId = async (req, res) => {
    try {
      const { senderId } = req.params;

      const announcements = await reuse.getAnnouncementsBySenderId(senderId);

      if (announcements.length === 0) {
        return res.status(404).json({ error: "No announcements found" });
      }

      res.status(200).json({ message: "Announcements retrieved successfully", announcements });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // SHOP MANAGEMENT
  getAllShops = async (req, res) => {
    try {
      const shops = await reuse.getAllShops();
      res.status(200).json({ message: "Shops retrieved successfully", shops });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getAllActiveShops = async (req, res) => {
    try {
      const activeShops = await reuse.getAllActiveShops();

      if (!activeShops.length) {
        return res.status(200).json({
          message: "No active shops found",
          shops: [],
        });
      }

      const shopIds = activeShops.map((shop) => shop.id);

      // Fetch all data in parallel
      const [ratings, evaluations, products] = await Promise.all([
        reuse.getShopsRatings(shopIds),
        reuse.getShopsEvaluations(shopIds),
        reuse.getShopsProducts(shopIds),
      ]);

      // Convert fetched data into maps for quick lookups
      const ratingMap = Object.fromEntries(ratings.map((r) => [r.shopId, r.rating]));
      const evaluationMap = Object.fromEntries(evaluations.map((e) => [e.shopId, e.evaluations]));
      const productMap = Object.fromEntries(products.map((p) => [p.shopId, p.products]));

      // Merge data into shop objects
      const shopData = activeShops.map((shop) => ({
        ...shop,
        rating: ratingMap[shop.id] || 0,
        evaluations: evaluationMap[shop.id] || 0,
        products: productMap[shop.id] || 0,
      }));

      res.status(200).json({
        message: "Active shops retrieved successfully",
        shops: shopData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getAllPendingShops = async (req, res) => {
    try {
      const pendingShops = await reuse.getAllPendingShops();

      if (!pendingShops.length) {
        return res.status(200).json({
          message: "No pending shops found",
          shops: [],
        });
      }

      const shopIds = pendingShops.map((shop) => shop.id);

      // Fetch additional data in parallel
      const [ratings, evaluations, products] = await Promise.all([
        reuse.getShopsRatings(shopIds),
        reuse.getShopsEvaluations(shopIds),
        reuse.getShopsProducts(shopIds),
      ]);

      // Create lookup maps for quick access
      const ratingMap = Object.fromEntries(ratings.map((r) => [r.shopId, r.rating]));
      const evaluationMap = Object.fromEntries(evaluations.map((e) => [e.shopId, e.evaluations]));
      const productMap = Object.fromEntries(products.map((p) => [p.shopId, p.products]));

      // Merge shop data
      const shopData = pendingShops.map((shop) => ({
        ...shop,
        rating: ratingMap[shop.id] || 0,
        evaluations: evaluationMap[shop.id] || 0,
        products: productMap[shop.id] || 0,
      }));

      res.status(200).json({
        message: "Pending shops retrieved successfully",
        shops: shopData,
      });
    } catch (error) {
      console.error("Error fetching pending shops:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };

  getAllBannedShops = async (req, res) => {
    try {
      // Fetch all banned shops, including banReason
      const bannedShops = await reuse.getAllBannedShops();

      if (!bannedShops.length) {
        return res.status(200).json({
          message: "No banned shops found",
          shops: [],
        });
      }

      // Extract shop IDs
      const shopIds = bannedShops.map((shop) => shop.id);

      // Fetch additional data in parallel
      const [ratings, evaluations, products] = await Promise.all([
        reuse.getShopsRatings(shopIds),
        reuse.getShopsEvaluations(shopIds),
        reuse.getShopsProducts(shopIds),
      ]);

      // Convert data to lookup maps for fast access
      const ratingMap = Object.fromEntries(ratings.map((r) => [r.shopId, r.rating]));
      const evaluationMap = Object.fromEntries(evaluations.map((e) => [e.shopId, e.evaluations]));
      const productMap = Object.fromEntries(products.map((p) => [p.shopId, p.products]));

      // Merge shop data
      const shopData = bannedShops.map((shop) => ({
        id: shop.id,
        name: shop.name,
        phone: shop.phone,
        address: shop.address,
        email: shop.email,
        status: shop.status,
        banReason: shop.banReason || "Unknown",
        rating: ratingMap[shop.id] || 0,
        evaluations: evaluationMap[shop.id] || 0,
        products: productMap[shop.id] || 0,
      }));

      res.status(200).json({
        message: "Banned shops retrieved successfully",
        shops: shopData,
      });
    } catch (error) {
      console.error("Error fetching banned shops:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };

  getShopById = async (req, res) => {
    try {
      const { id } = req.params;

      const shop = await reuse.getShopById(id);
      if (!shop) {
        return res.status(404).json({ error: "Shop not found" });
      }

      // waiting for product, promotion, comments, categories,...

      res.status(200).json({ message: "Shop retrieved successfully", shop });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  approveShopById = async (req, res) => {
    const t = await models.Shop.sequelize.transaction();
    try {
      const { id } = req.params;

      const approvedShop = await reuse.approveShopById(id, { transaction: t });
      if (approvedShop.error) {
        await t.rollback();
        const statusCode = approvedShop.error === "Shop not found" ? 404 : 400;
        return res.status(statusCode).json({ error: approvedShop.error });
      }

      await t.commit();

      res.status(200).json({ message: "Shop approved successfully", approvedShop });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  rejectShopById = async (req, res) => {
    const t = await models.Shop.sequelize.transaction();
    try {
      const { id } = req.params;

      const rejectedShop = await reuse.rejectShopById(id, { transaction: t });
      if (rejectedShop.error) {
        await t.rollback();
        const statusCode = rejectedShop.error === "Shop not found" ? 404 : 400;
        return res.status(statusCode).json({ error: rejectedShop.error });
      }

      await t.commit();

      res.status(200).json({ message: "Shop rejected successfully", rejectedShop });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  banShopById = async (req, res) => {
    const t = await models.Shop.sequelize.transaction();
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const bannedShop = await reuse.banShopById(id, reason, { transaction: t });
      if (bannedShop.error) {
        await t.rollback();
        const statusCode = bannedShop.error === "Shop not found" ? 404 : 400;
        return res.status(statusCode).json({ error: bannedShop.error });
      }

      await t.commit();

      res.status(200).json({ message: "Shop banned successfully", bannedShop });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  unbanShopById = async (req, res) => {
    const t = await models.Shop.sequelize.transaction();
    try {
      const { id } = req.params;

      const unbannedShop = await reuse.unbanShopById(id, { transaction: t });
      if (unbannedShop.error) {
        await t.rollback();
        const statusCode = unbannedShop.error === "Shop not found" ? 404 : 400;
        return res.status(statusCode).json({ error: unbannedShop.error });
      }

      await t.commit();

      res.status(200).json({ message: "Shop unbanned successfully", unbannedShop });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // PRODUCT MANAGEMENT
  getAllProducts = async (req, res) => {
    try {
      const products = await reuse.getAllProducts();
      res.status(200).json({ message: "Products retrieved successfully", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;

      const product = await reuse.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product retrieved successfully", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  banProductById = async (req, res) => {
    const t = await models.Product.sequelize.transaction();
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const bannedProduct = await reuse.banProductById(id, reason, { transaction: t });
      if (bannedProduct.error) {
        await t.rollback();
        const statusCode = bannedProduct.error === "Product not found" ? 404 : 400;
        return res.status(statusCode).json({ error: bannedProduct.error });
      }

      await t.commit();

      res.status(200).json({ message: "Product banned successfully", bannedProduct });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  unbanProductById = async (req, res) => {
    const t = await models.Product.sequelize.transaction();
    try {
      const { id } = req.params;

      const unbannedProduct = await reuse.unbanProductById(id, { transaction: t });
      if (unbannedProduct.error) {
        await t.rollback();
        const statusCode = unbannedProduct.error === "Product not found" ? 404 : 400;
        return res.status(statusCode).json({ error: unbannedProduct.error });
      }

      await t.commit();

      res.status(200).json({ message: "Product unbanned successfully", unbannedProduct });
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // PROMOTION MANAGEMENT
  getAllPromotions = async (req, res) => {
    try {
      const promotions = await reuse.getAllPromotions();
      res.status(200).json({ message: "Promotions retrieved successfully", promotions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getPromotionById = async (req, res) => {
    try {
      const { id } = req.params;

      const promotion = await reuse.getPromotionById(id);
      if (!promotion) {
        return res.status(404).json({ error: "Promotion not found" });
      }

      res.status(200).json({ message: "Promotion retrieved successfully", promotion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  deletePromotionById = async (req, res) => {
    try {
      const { id } = req.params;

      const deletedPromotion = await reuse.deletePromotionById(id);
      if (deletedPromotion.error) {
        return res.status(404).json({ error: deletedPromotion.error });
      }

      res.status(200).json({ message: "Promotion deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  // USER MANAGEMENT
  getUserById = async (req, res) => {
    try {
      const { id } = req.params;

      const user = await reuse.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

module.exports = new ModeratorController();
