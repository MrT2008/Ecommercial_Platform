const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');

const maxAge = 24 * 60 * 60; // 24 hours
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    console.log(err.message, err.code);

    let errors = { email: '', password: '' };

    if (err.message === "Incorrect email" || err.message === "Incorrect password") {
        errors.email = "Invalid email or password";
        errors.password = "Invalid email or password";
    }
    
    if (err.code === 11000) {
        errors.email = "That email is already registered";
    }
    
    return errors;
};

class AuthController {
    // check user is logged in 
    // if user is logged in, redirect to home page
    // if user is not logged in, redirect to login page
    getLogin = (req, res) => {
        const user = res.locals.user;
    
        if (user) {
            switch (user.role) {
                case 'admin':
                    return res.redirect('/admin');
                default:
                    return res.redirect('/dashboard');
            }
        }
    
        res.render('login');
    };
    
    postLogin = async (req, res) => {
        const { email, password } = req.body;
    
        try {
            const user = await User.login(email, password);
            const token = createToken(user.id);
    
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); // Convert seconds to milliseconds
            res.status(200).json({ 
                user: user.id, 
                email: user.email,
                role: user.role,
                token: token,
            });
        } catch (error) {
            const errors = handleErrors(error);
            res.status(400).json({ errors });
            // res.render('login', { errors });
        }
    };
    
    postLogout = (req, res) => {
        res.cookie('jwt', '', { maxAge: 1 });
        // res.redirect('/');
        res.status(200).json({ message: 'Logout' });
    };
    
    googleAuth = passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    });
    
    googleAuthFail = passport.authenticate("google", { 
        failureRedirect: "/login" 
    });
    
    googleAuthSuccess = async (req, res) => {
        if (!req.user) {
          return res.status(400).json({ message: "Google Authentication Failed" });
        }
      
        const token = createToken(req.user.id);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });
    
        res.redirect("/dashboard"); // Redirect after login
    };
}

module.exports = new AuthController();