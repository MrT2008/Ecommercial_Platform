const crypto = require('crypto');
const { models } = require('../models');
const sendGmailToUser = require('../utilities/sendGmail');

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

const getAnnouncementsBySenderId = async (senderId) => {
    return await models.Announcement.findAll({
        where: { senderId },
        include: { model: models.User, as: 'sender' },
    });
};

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
}

// SHOP MANAGEMENT
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

module.exports = {
    getAllUserByRole,
    banUserById,
    updateUserPassword,
    refreshUserPassworkById,
    sentAnnouncement,
    getAllAnnouncements,
    getAnnouncementsBySenderId,
    deleteAnnouncementById,
    banShopById,
    unbanShopById,
    getAllProducts,
    getProductById,
    banProductById,
    unbanProductById,
}
