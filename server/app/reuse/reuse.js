const { models } = require('../models');

const getAnnouncementBySender = async (senderId) => {
    const announcements = await models.Announcement.findAll({
        where: { senderId },
        include: { model: models.User, as: 'sender' },
    });

    return announcements;
}

const getAllAnnouncements = async () => {
    const announcements = await models.Announcement.findAll({
        include: { model: models.User, as: 'sender' },
    });

    return announcements;
}

const sentAnnouncement = async (senderId, title, imageURL, script) => {
    const t = await models.Announcement.sequelize.transaction();
    try {
        const user = await models.User.findByPk(senderId);
        if (!user) {
            await t.rollback();
            return { error: 'User not found' };
        }

        const newAnnouncement = await models.Announcement.create({ title, imageURL, script, senderId }, { transaction: t });

        await t.commit();

        return { message: 'Announcement sent successfully', announcement: newAnnouncement };
    } catch (error) {
        await t.rollback();
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

    return { message: 'Password updated successfully' };
}


const refreshUserPasswork = async (id, newPassword) => {
    const user = await models.User.findByPk(id);
    if (!user) {
        return { error: 'User not found' };
    }

    await user.update({ password: newPassword });

    return { message: 'Password updated successfully' };
}

const getAllUserByRole = async (role) => {
    try {
        const users = await models.User.findAll({ where: { role } });
        return users;
    }
    catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

const banUser = async (user) => {
    try {
        await user.update({ banned: true });
        return user;
    } catch (error) {
        console.error(error);
        return { error: 'Internal Server Error' };
    }
}

module.exports = {
    getAnnouncementBySender,
    getAllAnnouncements,
    sentAnnouncement,
    updateUserPassword,
    refreshUserPasswork,
    getAllUserByRole,
    banUser
}
