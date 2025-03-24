const express = require('express');
const router = express.Router();

const ManagerController = require('../app/controllers/managerController');

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;