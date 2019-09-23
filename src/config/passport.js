'use strict';

const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const user = require('../repositories/userRepository');
const config = require('../config');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT.secret;

const strategy = new Strategy(opts, async function(jwtPayload, next) {
    try {
        const data = await user.findById(jwtPayload.id);

        if (data.data.user) {
            return next(null, data.data.user, jwtPayload.roles);
        } else {
            return next(null, false);
        }
    } catch (err) {
        next(err, false);
    }
});

passport.use('jwt', strategy);
