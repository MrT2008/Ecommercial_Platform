const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuthN = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login')
            } else {
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
}

// check & set up curent user (để duy trì đăng nhập)
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let user = await User.findByPk(decodedToken.id)
                res.locals.user = user; // res là server
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuthN, checkUser };