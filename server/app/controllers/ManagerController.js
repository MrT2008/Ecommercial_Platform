const { models } = require('../models');
const reuse = require('../reuse/reuse');
class ManagerController {
    // USER MANAGEMENT
    createModerator = async (req, res) => {
        const t = await models.User.sequelize.transaction();
        try {
            const { email, fullName } = req.body;
            const password = process.env.MODERATOR_DEFAULT_PASSWORD;

            const existingUser = await models.User.findOne({ where: { email } });
            if (existingUser) {
                await t.rollback();
                return res.status(409).json({ error: 'This email is unavailable!' });
            }

            const newUser = await models.User.create({ email, password, fullName }, { transaction: t });

            const moderatorRole = await models.Role.findOne({ where: { name: 'moderator' } });
            if (!moderatorRole) {
                await t.rollback();
                return res.status(500).json({ error: "Internal Server Error" });
            }
            
            await models.UserRole.create({
                userId: newUser.id,
                roleId: moderatorRole.id,
            }, { transaction: t });
    
            await t.commit();

            const userResponse = {
                id: newUser.id,
                email: newUser.email,
                fullName: newUser.fullName,
                userStatus: newUser.userStatus,
                imageURL: newUser.imageURL,
                roles: ['moderator'],
            };
    
            res.status(201).json({ message: 'Moderator created successfully', user: userResponse });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    getAllModerators = async (req, res) => {
        try {
            const moderators = await reuse.getAllUserByRole('moderator');

            if (moderators.length === 0) {
                return res.status(404).json({ error: 'No moderators found' });
            }

            res.status(200).json({ message: 'Moderators retrieved successfully', moderators });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    banModeratorById = async (req, res) => {
        const t = await models.User.sequelize.transaction();
        try {
            const { id } = req.params;

            const bannedModerator = await reuse.banUserById(id, { transaction: t });

            if (bannedModerator.error) {
                await t.rollback();
                const statusCode = bannedModerator.error === 'User not found' ? 404 : 400;
                return res.status(statusCode).json({ error: bannedModerator.error });
            }

            await t.commit();

            res.status(200).json({ message: 'User banned successfully', bannedModerator });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Featured Announcement Management
    sendAnnouncement = async (req, res) => {
        const t = await models.Announcement.sequelize.transaction();
        try {
            const { title, imageURL, script } = req.body;
            const senderId = req.user.id;

            const announcement = await reuse.sentAnnouncement(senderId, title, imageURL, script, { transaction: t });
            if (announcement.error) {
                await t.rollback();
                return res.status(404).json({ error: announcement.error });
            }

            await t.commit();

            res.status(201).json({ message: 'Announcement sent successfully', announcement });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    
    getAllAnnouncements = async (req, res) => {
        try {
            const announcements = await reuse.getAllAnnouncements();
            res.status(200).json({ message: 'Announcements retrieved successfully', announcements });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };    

    getAllAnnouncementsByManager = async (req, res) => {
        try {
            const announcements = await reuse.getAnnouncementsBySenderId(req.user.id);
            res.status(200).json({ message: 'Announcements retrieved successfully', announcements });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };

    getAnnouncementsBySenderId = async (req, res) => {
        try {
            const { senderId } = req.params;
    
            const announcements = await reuse.getAnnouncementsBySenderId(senderId);
            
            if (announcements.length === 0) {
                return res.status(404).json({ error: 'No announcements found' });
            }

            res.status(200).json({ message: 'Announcements retrieved successfully', announcements });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    
    deleteAnnouncementById = async (req, res) => {
        try {
            const { id } = req.params;
    
            const deletedAnnouncement = await reuse.deleteAnnouncementById(id);
            if (deletedAnnouncement.error) {
                return res.status(404).json({ error: deletedAnnouncement.error });
            }
    
            res.status(200).json({ message: 'Announcement deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // SHOP MANAGEMENT
    banShopById = async (req, res) => {
        const t = await models.Shop.sequelize.transaction();
        try {
            const { id } = req.params;
            const { reason } = req.body;
    
            const bannedShop = await reuse.banShopById(id, reason, { transaction: t });
            if (bannedShop.error) {
                await t.rollback();
                const statusCode = bannedShop.error === 'Shop not found' ? 404 : 400;
                return res.status(statusCode).json({ error: bannedShop.error });
            }
    
            await t.commit();
    
            res.status(200).json({ message: 'Shop banned successfully', bannedShop });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    unbanShopById = async (req, res) => {
        const t = await models.Shop.sequelize.transaction();
        try {
            const { id } = req.params;
    
            const unbannedShop = await reuse.unbanShopById(id, { transaction: t });
            if (unbannedShop.error) {
                await t.rollback();
                const statusCode = unbannedShop.error === 'Shop not found' ? 404 : 400;
                return res.status(statusCode).json({ error: unbannedShop.error });
            }
    
            await t.commit();
    
            res.status(200).json({ message: 'Shop unbanned successfully', unbannedShop });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // PRODUCT MANAGEMENT
    getAllProducts = async (req, res) => {
        try {
            const products = await reuse.getAllProducts();
            res.status(200).json({ message: 'Products retrieved successfully', products });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    getProductById = async (req, res) => {
        try {
            const { id } = req.params;
    
            const product = await reuse.getProductById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
    
            res.status(200).json({ message: 'Product retrieved successfully', product });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    banProductById = async (req, res) => {
        const t = await models.Product.sequelize.transaction();
        try {
            const { id } = req.params;
            const { reason } = req.body;
    
            const bannedProduct = await reuse.banProductById(id, reason, { transaction: t });
            if (bannedProduct.error) {
                await t.rollback();
                const statusCode = bannedProduct.error === 'Product not found' ? 404 : 400;
                return res.status(statusCode).json({ error: bannedProduct.error });
            }
    
            await t.commit();
    
            res.status(200).json({ message: 'Product banned successfully', bannedProduct });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    unbanProductById = async (req, res) => {
        const t = await models.Product.sequelize.transaction();
        try {
            const { id } = req.params;
    
            const unbannedProduct = await reuse.unbanProductById(id, { transaction: t });
            if (unbannedProduct.error) {
                await t.rollback();
                const statusCode = unbannedProduct.error === 'Product not found' ? 404 : 400;
                return res.status(statusCode).json({ error: unbannedProduct.error });
            }
    
            await t.commit();
    
            res.status(200).json({ message: 'Product unbanned successfully', unbannedProduct });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new ManagerController();