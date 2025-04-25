const auth = require('./auth');
const sites = require('./sites');
const manager = require('./manager');
const { authenticateToken } = require('../app/middlewares/authenticate ');

const seller = require('./seller');
const buyer = require('./buyer')
const guest = require('./guest')
function route (app) {
  app.use('/api/auth', auth);

  // Protected routes
  app.use('/manager', authenticateToken, manager);
  app.use('/seller', seller)
  app.use('/buyer/:buyerId', buyer);
  app.use('/guest', guest)
  app.use('/', authenticateToken, sites);

}

module.exports = route;