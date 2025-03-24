const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    const t = await User.sequelize.transaction();
    try {
      let user = await User.findOne({ where: { email: profile.emails[0].value } });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          password: null,
          role: "buyer",
        }, { transaction: t });

        const buyerRole = await Role.findOne({ where: { name: 'buyer' } });
        if (!buyerRole) {
            await t.rollback();
            return done(new Error("Default role 'buyer' not found"), null);
        }

        await UserRole.create({
            userId: user.id,
            roleId: buyerRole.id,
        }, { transaction: t });
        await t.commit();
      }

      return done(null, user);
    } catch (err) {
      await t.rollback();
      return done(err, null);
    }
  }
));

module.exports = passport;