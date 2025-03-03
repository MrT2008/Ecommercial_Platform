const { checkUser } = require('../app/middlewares/authN');
const auth = require('./auth');
const { models } = require('../app/models');

function route (app) {
  app.get('*', checkUser);
  app.use('/auth', auth);
}

module.exports = route;