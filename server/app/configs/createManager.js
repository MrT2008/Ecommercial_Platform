const User = require('../models/User');
const Role = require('../models/Role');
const UserRole = require('../models/UserRole');
const sequelize = require('./dbConfig'); 

const createUser = async () => {
  try {
    await sequelize.sync();
    
    const user = await User.create({
      email: 'manager@gmail.com',
      password: 'manager',
      googleId: null,
    });

    const managerRole = await Role.findOne({ where: { role: 'manager' } });
    if (!managerRole) {
      console.error("Default role 'manager' not found");
      return;
    }

    await UserRole.create({
      userId: user.id,
      roleId: managerRole.id,
    });

    console.log('User created:', user.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await sequelize.close();
  }
};

createUser();