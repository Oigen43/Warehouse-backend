'use strict';

const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { sequelize } = require('@models');
const user = require('@repositories/userRepository');
const config = require('@config');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT.secret;

const strategy = new Strategy(opts, async function(jwtPayload, next) {
    let transaction;

    try {
        transaction = await sequelize.transaction();
        const userData = await user.findById(jwtPayload.id);
        await transaction.commit();
        if (jwtPayload.iat < Math.floor(Date.parse(userData.loggedAt) / 1000)) {
            return next(null, false);
        }
        if (userData) {
            return next(null, userData, jwtPayload.roles);
        } else {
            return next(null, false);
        }
    } catch (err) {
        await transaction.rollback();
        next(err, false);
    }
});

passport.use('jwt', strategy);
