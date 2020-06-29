const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');

require('dotenv').config();

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies){
        token = req.cookies["accessToken"];
    }
    return token;
}

passport.use(new JWTStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : process.env.PASSPORT_SECRET
}, (payload, done) => {
    User.findById({_id : payload.sub}, (err, user)=>{
        if (err)
            return done(err, false);
        if (user)
            return done(null, user);
        else
            return done(null, false);
    });
}));

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        // Database error
        if (err)
            return done(err);
        // No user exists
        if (!user)
            return done(null, false);
        // Verify password
        user.comparePassword(password, done);
    });
}));