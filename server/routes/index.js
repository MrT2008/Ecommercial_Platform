const auth = require('./auth');
const sites = require('./sites');
const manager = require('./manager');
const { authenticateToken } = require('../app/middlewares/authenticate ');

function route (app) {
  app.use('/api/auth', auth);

  // Protected routes
  app.use('/manager', authenticateToken, manager);
  app.use('/', authenticateToken, sites);
}

module.exports = route;