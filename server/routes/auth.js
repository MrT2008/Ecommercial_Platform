const express = require('express');
const passport = require('passport');
const AuthController = require("../app/controllers/authController");
const router = express.Router();

// Initialize passport middleware
router.use(passport.initialize());

// Auth
router.post('/register', AuthController.postRegister);
router.post('/login', AuthController.postLogin);
router.get("/google", AuthController.googleAuth);
router.get("/google/callback", AuthController.googleAuthFail, AuthController.googleAuthSuccess);
router.post('/token', AuthController.postToken);
router.post('/logout', AuthController.postLogout);
module.exports = router;