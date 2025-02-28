const express = require('express');
const { login_get, login_post } = require('../app/controllers/AuthController');
const router = express.Router();

// Auth
router.get('/login', login_get);

router.post('/login', login_post);

router.get('/logout', (req, res) => {
    res.send('Logout page');
});

module.exports = router;