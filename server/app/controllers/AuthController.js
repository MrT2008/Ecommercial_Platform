const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const joi = require('joi');
const { comparePassword, generateAccessToken, generateRefreshToken } = require('../middlewares/auth');

class AuthController {
    postRegister = async (req, res) => {
        try {
            const { error } = validateLogin(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const user = await User.findOne({ where: { email: req.body.email } });

            if (user) return res.status(409).json({ error: 'Email already exists' });
            await User.create({ email: req.body.email, password: req.body.password });

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    
    postLogin = async (req, res) => {
        try {
            const { error } = validateLogin(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const user = await User.findOne({ where: { email: req.body.email } });
            if (!user) return res.status(404).json({ error: 'Invalid Email or Password' });

            const validPassword = await comparePassword(req.body.password, user.password);
            if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                maxAge: parseInt(process.env.COOKIE_EXPIRE),
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });

            const userData = user.toJSON();
            delete userData.password;
            
            res.status(200).json({ data: { user: userData, accessToken, refreshToken }, message: 'Login Successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

    postToken = async (req, res) => {
        const refreshToken = req.cookies.jwt;
        if (!refreshToken) return res.sendStatus(401);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) return res.sendStatus(403);

            const user = await User.findByPk(decoded.id);
            if (!user) return res.sendStatus(404);
            
            const accessToken = generateAccessToken(user);
            res.json({ accessToken });
        });
    };
    
    postLogout = (req, res) => {
        const refreshToken = req.cookies.jwt;
        res.clearCookie('jwt');
        res.status(200).json({ message: 'Logout Successfully' });
    };
    
    googleAuth = passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    });
    
    googleAuthFail = passport.authenticate("google", { 
        failureRedirect: "/api/auth/login",
        session: false,
    });
    
    googleAuthSuccess = async (req, res) => {
        if (!req.user) return res.status(400).json({ message: "Google Authentication Failed" });
      
        const accessToken = generateAccessToken(req.user);
        const refreshToken = generateRefreshToken(req.user);

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: parseInt(process.env.COOKIE_EXPIRE),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        const userData = req.user.toJSON();
        delete userData.password;

        res.status(200).json({ user: userData, accessToken, refreshToken, message: 'Login Successfully' });
    };
}

const validateLogin = (user) => {
    const schema = joi.object({
        email: joi.string().email().max(100).required().label('Email'),
        password: joi.required().label('Password'),
    });
    return schema.validate(user);
};

module.exports = new AuthController();