const { models } = require('../models');
const reuse = require('../reuse/reuse');
const { Sequelize } = require('sequelize');

class ManagerController {
    getDashboardData = async (req, res) => {
        try {
            const totalUsers = await reuse.getTotalActiveUsers();
            const totalShops = await reuse.getTotalActiveShops();
            const totalSales = await reuse.getTotalSales();
            const totalProductsSold = await reuse.getTotalProductsSold();

            res.status(200).json({
                message: 'Dashboard data retrieved successfully',
                data: {
                    totalUsers,
                    totalShops,
                    totalSales,
                    totalProductsSold
                }
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Featured Announcement Management
    sendAnnouncement = async (req, res) => {
        const t = await models.Announcement.sequelize.transaction();
        try {
            const { title, script } = req.body;
            const imageURL = req.file ? req.file.path : 'D:\GitHub\Ecommercial_Platform\client\public\Pictures\defaut\Annoucement.jpg'; 
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
            for (const announcement of announcements) {
                if (announcement.imageURL) {
                    // Normalize the image path
                    announcement.imageURL = announcement.imageURL.replace(/^.*[\\\/]public[\\\/]/, '/');
                    // Prepend the full URL
                    announcement.imageURL = `${req.protocol}://${req.get('host')}${announcement.imageURL}`;
                }
            }
            res.status(200).json({ message: 'Announcements retrieved successfully', announcements });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
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
    
            res.status(200).json({ message: 'Announcement edited successfully', editedAnnouncement });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
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

    // SHOP MANAGEMENT
    getAllShops = async (req, res) => {
        try {
            const shops = await reuse.getAllShops();
            res.status(200).json({ message: 'Shops retrieved successfully', shops });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    getAllActiveShops = async (req, res) => {
        try {
            const activeShops = await reuse.getAllActiveShops();

            if (!activeShops.length) {
                return res.status(200).json({
                    message: 'No active shops found',
                    shops: []
                });
            }
            
            const shopsWithDetails = await Promise.all(activeShops.map(async (shop) => {
                const averageRating = await reuse.getAverageRatingsByShopId(shop.id);
                const totalEvaluations = await reuse.getTotalEvaluationsByShopId(shop.id);
                const totalProducts = await reuse.getTotalProductsByShopId(shop.id);
    
                return {
                    ...shop.toJSON(),
                    averageRating,
                    totalEvaluations,
                    totalProducts
                };
            }));
    
            res.status(200).json({
                message: 'Active shops retrieved successfully',
                shops: shopsWithDetails
            });
        } catch (error) {
            console.error('Error fetching active shops:', error);
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    

    getAllPendingShops = async (req, res) => {
        try {
            const pendingShops = await reuse.getAllPendingShops();
            if (!pendingShops.length) {
                return res.status(200).json({
                    message: 'No pending shops found',
                    shops: []
                });
            }
    
            res.status(200).json({
                message: 'Pending shops retrieved successfully',
                shops: pendingShops
            });
        } catch (error) {
            console.error('Error fetching pending shops:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    };
    

    getAllBannedShops = async (req, res) => {
        try {
            // Fetch all banned shops, including banReason
            const bannedShops = await reuse.getAllBannedShops();
            if (!bannedShops.length) {
                return res.status(200).json({
                    message: 'No banned shops found',
                    shops: []
                });
            }
            
            const shopsWithDetails = await Promise.all(bannedShops.map(async (shop) => {
                const averageRating = await reuse.getAverageRatingsByShopId(shop.id);
                const totalEvaluations = await reuse.getTotalEvaluationsByShopId(shop.id);
                const totalProducts = await reuse.getTotalProductsByShopId(shop.id);
    
                return {
                    ...shop.toJSON(),
                    averageRating,
                    totalEvaluations,
                    totalProducts
                };
            }));
    
            res.status(200).json({
                message: 'Active shops retrieved successfully',
                shops: shopsWithDetails
            });
        } catch (error) {
            console.error('Error fetching banned shops:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    };
    

    getShopById = async (req, res) => {
        try {
            const { id } = req.params;
    
            const shop = await reuse.getShopById(id);
            if (!shop) {
                return res.status(404).json({ error: 'Shop not found' });
            }

            const averageRating = await reuse.getAverageRatingsByShopId(shop.id);
            const totalEvaluations = await reuse.getTotalEvaluationsByShopId(shop.id);
            const totalProducts = await reuse.getTotalProductsByShopId(shop.id);
            // const products
    
            // waiting for product, promotion, comments, categories,...

            res.status(200).json({
                message: 'Active shops retrieved successfully',
                shops: {
                    ...shop.toJSON(),
                    averageRating,
                    totalEvaluations,
                    totalProducts
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    approveShopById = async (req, res) => {
        const t = await models.Shop.sequelize.transaction();
        try {
            const { id } = req.params;
    
            const approvedShop = await reuse.approveShopById(id, { transaction: t });
            if (approvedShop.error) {
                await t.rollback();
                const statusCode = approvedShop.error === 'Shop not found' ? 404 : 400;
                return res.status(statusCode).json({ error: approvedShop.error });
            }
    
            await t.commit();
    
            res.status(200).json({ message: 'Shop approved successfully', approvedShop });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    rejectShopById = async (req, res) => {
        const t = await models.Shop.sequelize.transaction();
        try {
            const { id } = req.params;
    
            const rejectedShop = await reuse.rejectShopById(id, { transaction: t });
            if (rejectedShop.error) {
                await t.rollback();
                const statusCode = rejectedShop.error === 'Shop not found' ? 404 : 400;
                return res.status(statusCode).json({ error: rejectedShop.error });
            }
    
            await t.commit();
    
            res.status(200).json({ message: 'Shop rejected successfully', rejectedShop });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

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
    getAllProductsByShopId = async (req, res) => {
        try {
            const { id } = req.params;
            const products = await models.Product.findAll({where: { shopId: id }});;
            const allProducts = await reuse.getProducts(products, req);
            res.status(200).json({ message: 'Products retrieved successfully', allProducts });
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

    // PROMOTION MANAGEMENT
    getAllPromotions = async (req, res) => {
        try {
            const promotions = await reuse.getAllPromotions();
            res.status(200).json({ message: 'Promotions retrieved successfully', promotions });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    getPromotionById = async (req, res) => {
        try {
            const { id } = req.params;
    
            const promotion = await reuse.getPromotionById(id);
            if (!promotion) {
                return res.status(404).json({ error: 'Promotion not found' });
            }
    
            res.status(200).json({ message: 'Promotion retrieved successfully', promotion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    deletePromotionById = async (req, res) => {
        try {
            const { id } = req.params;
            const { reason } = req.body;

            const deletedPromotion = await reuse.deletePromotionById(id, reason);
            if (deletedPromotion.error) {
                return res.status(404).json({ error: deletedPromotion.error });
            }

            res.status(200).json({ message: 'Promotion deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

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
            const { reason } = req.body;

            const bannedModerator = await reuse.banUserById(id, reason, { transaction: t });

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

    getUserById = async (req, res) => {
        try {
            const { id } = req.params;

            const user = await reuse.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.status(200).json({ message: 'User retrieved successfully', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    getAllUsers = async (req, res) => {
        
        try {
            const users = await models.User.findAll({
                where: { isActive: true },
            });
            const allUsers =[];
            for (const user of users) {
                const userRole = await models.UserRole.findAll({where: {userId : user.id}}); 
                const nameRole = [];

                for (const r of userRole) {
                    const role = await models.Role.findOne({where: {id:r.roleId}})
                    nameRole.push(role.name);
                };
                allUsers.push({
                    ...user.toJSON(),
                    role : nameRole
                })
            }           
            res.status(200).json({ message: 'Users retrieved successfully', allUsers });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
}

module.exports = new ManagerController();