const auth = require('./auth');
const sites = require('./sites');
const { authenticateToken } = require('../app/middlewares/auth');

function route (app) {
  app.use('/api/auth', auth);

  // Protected routes
  app.use('/', authenticateToken, sites);
}

module.exports = route;