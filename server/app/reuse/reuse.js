const crypto = require('crypto');
const { models } = require('../models');
const sendGmailToUser = require('../utilities/sendGmail');

// FEATURES MANAGEMENT
const sentAnnouncement = async (senderId, title, imageURL, script, options = {}) => {
    try {
        const announcement = await models.Announcement.create({
            senderId, title, imageURL, script,
        }, options);

        return announcement;
    }
    catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
};

const getAllAnnouncements = async () => {
    return await models.Announcement.findAll({
        include: { model: models.User, as: 'sender' },
    });
};

const editAnnouncementById = async (id, title, imageURL, script) => {
    try {
        const announcement = await models.Announcement.findByPk(id);
        if (!announcement) {
            return { error: 'Announcement not found' };
        }

        await announcement.update({ title, imageURL, script });

        return announcement;
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

const deleteAnnouncementById = async (id) => {
    try {
        const announcement = await models.Announcement.findByPk(id);
        if (!announcement) {
            return { error: 'Announcement not found' };
        }

        await announcement.update({ isActive: false });

        return { message: 'Announcement deleted successfully' };
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
};

const getAnnouncementsBySenderId = async (senderId) => {
    return await models.Announcement.findAll({
        where: { senderId },
        include: { model: models.User, as: 'sender' },
    });
};

// SHOP MANAGEMENT
const getAllShops = async () => {
    return await models.Shop.findAll();
}

const getShopById = async (id) => {
    return await models.Shop.findByPk(id);
}

const getAllActiveShops = async () => {
    const activeShops = await models.Shop.findAll({ where: { status: 'active' } });
    const inactiveShops = await models.Shop.findAll({ where: { status: 'inactive' } });

    const shops = activeShops.concat(inactiveShops); // show shops which is not banned or pending status first
    shops.sort((a, b) => a.id - b.id);
    return shops;
}

const getAllPendingShops = async () => {
    return await models.Shop.findAll({ where: { status: 'pending' } });
}

const getAllBannedShops = async () => {
    return await models.Shop.findAll({ where: { status: 'banned' } });
}

const registerShop = async (userId, name, description, address, phone, email, bankName, bankAccount, options = {}) => {
    try {
        const shop = await models.Shop.create({
            userId, name, description, address, phone, email, bankName, bankAccount
        }, options);

        return shop;
    }
    catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

const approveShopById = async (id, options = {}) => {
    try {
        const shop = await models.Shop.findByPk(id);
        if (!shop) {
            return { error: 'Shop not found' };
        }

        if (shop.status === 'active') {
            return { message: 'Shop is already active', shop };
        }

        const updatedShop = await shop.update({
            status: 'active'
        }, options);

        return updatedShop;
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

const rejectShopById = async (id, options = {}) => {
    try {
        const shop = await models.Shop.findByPk(id);
        if (!shop) {
            return { error: 'Shop not found' };
        }

        if (shop.status === 'inactive') {
            return { message: 'Shop is already inactive', shop };
        }

        await shop.destroy(shop, options);

        return { message: 'Shop rejected successfully' };
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

const banShopById = async (id, reason, options = {}) => {
    try {
        const shop = await models.Shop.findByPk(id);
        if (!shop) {
            return { error: 'Shop not found' };
        }

        if (shop.status === 'banned') {
            return { message: 'Shop is already banned', shop };
        }

        const updatedShop = await shop.update({
            status: 'banned',
            banReason: reason
        }, options);

        return updatedShop;
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

const unbanShopById = async (id, options = {}) => {
    try {
        const shop = await models.Shop.findByPk(id);
        if (!shop) {
            return { error: 'Shop not found' };
        }

        if (shop.status === 'active') {
            return { message: 'Shop is already active', shop };
        }

        const updatedShop = await shop.update({
            status: 'active',
            banReason: null
        }, options);

        return updatedShop;
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

const getAverageRatingsByShopId = async (shopId) => {
    try {
        const reviews = await models.Review.findOne({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']
            ],
            include: [
                {
                    model: Product,
                    attributes: [],
                    where: { shopId }, // Filter by shop ID
                }
            ],
            raw: true
        });

        return reviews.averageRating ? parseFloat(reviews.averageRating).toFixed(2) : 0;
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

const getTotalEvaluationsByShopId = async (shopId) => {
    try {
        const result = await models.Review.findOne({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('Review.id')), 'totalEvaluations']
            ],
            include: [
                {
                    model: Product,
                    attributes: [], // We only need filtering, not product details
                    where: { shopId }
                }
            ],
            raw: true
        });

        return result.totalEvaluations || 0;
    } catch (error) {
        console.error('Error fetching total evaluations:', error);
        return 0;
    }
};

const getTotalProductsByShopId = async (shopId) => {
    try {
        const result = await Product.findOne({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'totalProducts']
            ],
            where: { shopId },
            raw: true
        });

        return result.totalProducts || 0;
    } catch (error) {
        console.error('Error fetching total products:', error);
        return 0;
    }
};

// PRODUCT MANAGEMENT
const getAllProducts = async () => {
    return await models.Product.findAll();
}

const getProductById = async (id) => {
    return await models.Product.findByPk(id);
}

const banProductById = async (id, reason, options = {}) => {
    try {
        const product = await models.Product.findByPk(id);
        if (!product) {
            return { error: 'Product not found' };
        }

        if (product.status === 'banned') {
            return { message: 'Product is already banned', product };
        }

        const updatedProduct = await product.update({
            status: 'banned',
            banReason: reason
        }, options);

        return updatedProduct;
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

const unbanProductById = async (id, options = {}) => {
    try {
        const product = await models.Product.findByPk(id);
        if (!product) {
            return { error: 'Product not found' };
        }

        if (product.status === 'active') {
            return { message: 'Product is already active', product };
        }

        const updatedProduct = await product.update({
            status: 'active',
            banReason: null
        }, options);

        return updatedProduct;
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

// USER MANAGEMENT
const getAllUserByRole = async (role) => {
    return await models.User.findAll({ where: { role } });
}

const banUserById = async (id, options = {}) => {
    try {
        const user = await models.User.findByPk(id, options);
        if (!user) {
            return { error: 'User not found' };
        }

        const updatedUser = await user.update({ isBanned: true }, options);

        return updatedUser;
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
};


const updateUserPassword = async (id, newPassword) => {
    const user = await models.User.findByPk(id);
    if (!user) {
        return { error: 'User not found' };
    }

    await user.update({ password: newPassword });

    return user;
}

const refreshUserPassworkById = async (id) => {
    try {
        const user = await models.User.findByPk(id);
        if (!user) {
            return { error: 'User not found' };
        }
        
        const newPassword = crypto.randomBytes(6).toString('base64');

        const updatedUser = await user.update({ password: newPassword });

        await sendGmailToUser(
            user.email,
            'Your Password Has Been Reset',
            `Hello ${user.username},\n\nYour password has been reset. Your new password is: ${newPassword}\n\nPlease change it after logging in for security reasons.`
        );
    
        return updatedUser;
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

const getUserById = async (id) => {
    return await models.User.findByPk(id);
}

// PROMOTION MANAGEMENT
const getAllPromotions = async () => {
    return await models.Promotion.findAll();
}

const getPromotionById = async (id) => {
    return await models.Promotion.findByPk(id);
}

const createPromotion = async (shopId, title, imageURL, script, options = {}) => {
    try {
        const promotion = await models.Promotion.create({
            shopId, title, imageURL, script,
        }, options);

        return promotion;
    }
    catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
};

const deletePromotionById = async (id) => {
    try {
        const promotion = await models.Promotion.findByPk(id);
        if (!promotion) {
            return { error: 'Promotion not found' };
        }

        await promotion.destroy();

        return { message: 'Promotion deleted successfully' };
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
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
    getAllProducts,
    getProductById,
    banProductById,
    unbanProductById,
    getAllUserByRole,
    banUserById,
    updateUserPassword,
    refreshUserPassworkById,
    getUserById,
    getAllPromotions,
    getPromotionById,
    createPromotion,
    deletePromotionById,
}
