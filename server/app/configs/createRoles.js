const Role = require("../models/Role");
const sequelize = require("./dbConfig");

const createRoles = async () => {
    try {
        await sequelize.sync();

        const roles = ['manager', 'moderator', 'buyer', 'seller'];
        for (const role of roles) {
            await Role.create({ name: role });
        }

        console.log('Roles created:', roles);
    } catch (error) {
        console.error('Error creating roles:', error);
    } finally {
        await sequelize.close();
    }
}

createRoles();