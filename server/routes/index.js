const { checkUser } = require('../app/middlewares/authN');
const siteRouter = require('./site');
const { models } = require('../app/models');

function route (app) {
  app.get('*', checkUser);
  app.use('/', siteRouter);
}

module.exports = route;