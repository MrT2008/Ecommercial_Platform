const jwt = require('jsonwebtoken');
const { models } = require('../models');
const passport = require('passport');
const joi = require('joi');
const { comparePassword, generateAccessToken, generateRefreshToken } = require('../middlewares/authenticate ');

class AuthController {
    postRegister = async (req, res) => {
        const t = await models.User.sequelize.transaction();
        try {
            const { error } = validateRegister(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const { email, password, fullName} = req.body;
            
            const existingUser = await models.User.findOne({ where: { email } });
            if (existingUser) {
                await t.rollback();
                return res.status(409).json({ error: 'This email is available!' });
            }

            const newUser = await models.User.create({ email, password, fullName }, { transaction: t });

            const buyerRole = await models.Role.findOne({ where: { name: 'buyer' } });
            if (!buyerRole) {
                await t.rollback();
                return res.status(500).json({ error: "Internal Server Error" });
            }
            
            await models.UserRole.create({
                userId: newUser.id,
                roleId: buyerRole.id,
            }, { transaction: t });
    
            await t.commit();

            const userResponse = {
                id: newUser.id,
                email: newUser.email,
                fullName: newUser.fullName,
                userStatus: newUser.userStatus,
                imageURL: newUser.imageURL,
                roles: ['buyer'],
            };
    
            res.status(201).json({ message: 'User registered successfully', user: userResponse });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    
    postLogin = async (req, res) => {
        try {
            const { error } = validateLogin(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const user = await models.User.findOne({ where: { email: req.body.email } });
            if (!user) return res.status(404).json({ error: 'Invalid Email or Password' });

            const userRoles = await models.UserRole.findAll({ where: { userId: user.id }});
            const roles = userRoles.map(async (userRole) => {
                await models.Role.findByPk(userRole.roleId)
                    .then(role => role.name)
                    .catch(err => console.error(err));
            });

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
            
            res.status(200).json({
                data: { user: {
                    ...userData,
                    roles,
                }, 
                accessToken, 
                refreshToken },
                message: 'Login Successfully'
            });
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

            const user = await models.User.findByPk(decoded.id);
            if (!user) return res.sendStatus(404);
            
            const accessToken = generateAccessToken(user);
            res.json({ accessToken });
        });
    };
    
    postLogout = (req, res) => {
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
        
        const userRoles = await models.UserRole.findAll({ where: { userId: user.id }});
        const roles = userRoles.map(async (userRole) => {
            await models.Role.findByPk(userRole.roleId)
                .then(role => role.name)
                .catch(err => console.error(err));
        });

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

        res.status(200).json({
            data: { user: {
                ...userData,
                roles,
            }, 
            accessToken, 
            refreshToken },
            message: 'Login Successfully'
        });
    };

    
}

const validateRegister = (user) => {
    const schema = joi.object({
        email: joi.string().email().max(100).required().lowercase().label('Email'),
        password: joi.required().label('Password'),
        fullName: joi.string().max(100).required().label('Full Name'),
    });
    return schema.validate(user);
};

const validateLogin = (user) => {
    const schema = joi.object({
        email: joi.string().email().max(100).required().lowercase().label('Email'),
        password: joi.required().label('Password'),
    });
    return schema.validate(user);
};

module.exports = new AuthController();