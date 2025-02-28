const User = require('../models/User');
const sequelize = require('./configDB'); 

const createAdmin = async () => {
  try {
    await sequelize.sync();
    
    const admin = await User.create({
      email: 'admin@gmail.com',
      password: 'admin1',
      role: 'admin',
    });

    console.log('Admin created:', admin.toJSON());
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await sequelize.close();
  }
};

createAdmin();