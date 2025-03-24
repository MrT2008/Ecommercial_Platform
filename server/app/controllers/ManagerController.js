const { models } = require('../models');
const reuse = require('../reuse/reuse');

class ManagerController {
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
            res.status(200).json({ message: 'Announcements retrieved successfully', announcements });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}

module.exports = new ManagerController();