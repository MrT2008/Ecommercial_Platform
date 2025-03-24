const express = require('express');
const router = express.Router();

const ManagerController = require('../app/controllers/ManagerController');

router.get('/', ManagerController.createModerator);

module.exports = router;