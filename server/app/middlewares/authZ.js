const jwt = require('jsonwebtoken');

const requireAuthZ = (permission) => async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        console.log('ERROR: No token provided');
        return res.redirect('/login');
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = res.locals.user; // Use user from checkUser middleware

        if (!user) {
            console.log('ERROR: No user found');
            res.cookie('jwt', '', { maxAge: 1 });
            return res.redirect('/login');
        } else if (!user.role) {
            console.log('ERROR: Missing user role');
            res.cookie('jwt', '', { maxAge: 1 });
            return res.redirect('/login');
        }

        if (!permission.includes(user.role)) {
            console.log(`ERROR: Unauthorized access attempt - User Role: ${user.role}`);
            res.cookie('jwt', '', { maxAge: 1 });
            return res.redirect('/login');
        }
        
        next();
    } catch (err) {
        console.log('ERROR: Invalid Token', err.message);
        res.cookie('jwt', '', { maxAge: 1 });
        return res.redirect('/login');
    }
};

module.exports = { requireAuthZ };