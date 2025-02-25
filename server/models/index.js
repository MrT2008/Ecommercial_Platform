const sequelize = require('../configs/configDB');
const User = require('./User');

const models = {
  User,
};

const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
    await sequelize.sync();
    console.log('Database synced!');
  } catch (err) {
    console.error('Database connection or sync failed:', err);
  }
};

module.exports = { models, syncModels };