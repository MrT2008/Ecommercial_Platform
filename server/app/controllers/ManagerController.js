const { models } = require('../models');
const { createAnnouncement, banUser } = require('../reuse/reuse');

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

    getModerators = async (req, res) => {
        try {
            const moderators = await getAllUserByRole('moderator');
            if (!moderators) {
                return res.status(404).json({ error: 'Moderators not found' });
            }

            res.status(200).json({ message: 'Moderators retrieved successfully', moderators });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    updateModerator = async (req, res) => {
        const t = await models.User.sequelize.transaction();
        try {
            const { id } = req.params;
            const { email, fullName } = req.body;

            const moderator = await models.User.findByPk(id);
            if (!moderator) {
                await t.rollback();
                return res.status(404).json({ error: 'Moderator not found' });
            }

            const updatedModerator = await moderator.update({ email, fullName }, { transaction: t });

            await t.commit();

            res.status(200).json({ message: 'Moderator updated successfully', moderator: updatedModerator });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    banUserById = async (req, res) => {
        const t = await models.User.sequelize.transaction();
        try {
            const { id } = req.params;

            const user = await models.User.findByPk(id);
            if (!user) {
                await t.rollback();
                return res.status(404).json({ error: 'User not found' });
            }

            const bannedUser = await banUser(user, { transaction: t });

            await t.commit();

            res.status(200).json({ message: 'User banned successfully', bannedUser });
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

            const user = await models.User.findByPk(senderId);
            if (!user) {
                await t.rollback();
                return res.status(404).json({ error: 'User not found' });
            }

            const newAnnouncement = await createAnnouncement(title, imageURL, script, senderId, { transaction: t });

            await t.commit();

            res.status(201).json({ message: 'Announcement sent successfully', announcement: newAnnouncement });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
    
    // Admin sent announcements
    getAnnouncements = async (req, res) => {
        try {
            const user = await models.User.findByPk(req.user.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const announcements = await models.Announcement.findAll({
                where: { senderId: req.user.id },
                include: [{ model: models.User, as: 'sender', attributes: ['id', 'fullName', 'imageURL'] }]
            });

            res.status(200).json({ message: 'Announcements retrieved successfully', announcements });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}

module.exports = new ManagerController();