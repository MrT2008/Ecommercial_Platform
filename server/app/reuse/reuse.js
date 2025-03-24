const { models } = require('../models');
const { options } = require('../models/User');

const getAllUserByRole = async (role) => {
    return await models.User.findAll({ where: { role } });
}

const banUserById = async (id) => {
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
}

const updateUserPassword = async (id, newPassword) => {
    const user = await models.User.findByPk(id);
    if (!user) {
        return { error: 'User not found' };
    }

    await user.update({ password: newPassword });

    return { message: 'Password updated successfully' };
}

// const refreshUserPassworkById = async (id) => {
//     try {
//         const user = await models.User.findByPk(id);
//         if (!user) {
//             return { error: 'User not found' };
//         }
        
//         // new password is a random string

//         const updatedUser = await user.update({ password: newPassword });
    
//         return { message: 'Password updated successfully', updatedUser };
//     } catch (error) {
//         console.error(error);
//         return { error: 'Internal Server Error' };
//     }
// }

const sentAnnouncement = async (senderId, title, imageURL, script) => {
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

module.exports = {
    getAllUserByRole,
    banUserById,
    updateUserPassword,
    sentAnnouncement,
    getAllAnnouncements,
    getAnnouncementsBySenderId,
}
