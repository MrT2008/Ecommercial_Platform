const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const maxAge = 24 * 60 * 60; // 24h
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
    
    if (err.message === 'Incorrect email') {
        errors.email = 'That email is not registered';
    }
    
    if (err.message === 'Incorrect password') {
        errors.password = 'That password is incorrect';
    }
    
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }
    
    return errors;
}

// ✅ Handle GET request to login page
module.exports.login_get = (req, res) => {
    const user = res.locals.user;
    if (user) {
        switch (user.role) {
            case 'admin':
                return res.redirect('/admin');
            default:
                break;
        }
    }
    // res.render('login');
    res.status(200).json({ message: 'Login page' });
};

// ✅ Handle POST request for user login
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user.id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 }); // Convert seconds to milliseconds
        // res.status(200).json({ user: user.id });
        res.status(200).json({ user });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

// ✅ Handle user logout
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    // res.redirect('/');
    res.status(200).json({ message: 'Logout' });
};