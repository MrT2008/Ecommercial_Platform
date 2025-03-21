const User = require('../models/User');
const Role = require('../models/Role');
const UserRole = require('../models/UserRole');
const sequelize = require('./dbConfig'); 

const createUser = async () => {
  const t = await sequelize.transaction();
  try {
    const user = await User.create({
        email: 'manager@gmail.com',
        password: 'manager',
        googleId: null,
      }, 
      { transaction: t }
    );

    const managerRole = await Role.findOne({ where: { name: 'manager' } });
    if (!managerRole) {
      throw new Error("Default role 'manager' not found");
    }

    await UserRole.create({
        userId: user.id,
        roleId: managerRole.id,
      },
      { transaction: t }
    );

    await t.commit();
    console.log('User created:', user.toJSON());
  } catch (error) {
    await t.rollback();
    console.error('Error creating user:', error);
  } finally {
    await sequelize.close();
  }
};

createUser();