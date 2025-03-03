const User = require('../models/User');
const sequelize = require('./dbConfig'); 

const createUser = async () => {
  try {
    await sequelize.sync();
    
    const user = await User.create({
      email: 'manager@gmail.com',
      password: 'manager',
      role: 'manager',
      googleId: null,
    });

    console.log('User created:', user.toJSON());
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await sequelize.close();
  }
};

createUser();