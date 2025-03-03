const express = require('express');
const passport = require('passport');
const session = require('express-session');
const AuthController = require("../app/controllers/authController");
const router = express.Router();

// Initialize session middleware
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }));

// Initialize passport middleware
router.use(passport.initialize());
router.use(passport.session());

// Auth
router.get('/login', AuthController.getLogin);
router.post('/login', AuthController.postLogin);
router.get("/google", AuthController.googleAuth);
router.get(
    "/google/callback",
    AuthController.googleAuthFail,
    AuthController.googleAuthSuccess
);
router.post('/logout', AuthController.postLogout);
module.exports = router;