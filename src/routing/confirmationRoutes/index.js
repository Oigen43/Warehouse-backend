'use strict';

const express = require('express');
const passport = require('passport');
const messageCode = require('../../const/messageCode');
const confirmationController = require('../../controllers/confirmationController');

const router = express.Router();

function authenticateJwt(req, res, next) {
    passport.authenticate('jwt', {session: false}, function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { res.status(401).send({ data: { statusCode: messageCode.USER_GET_CONFIRMATION_FORM_ERROR } }); }
        req.user = user;
        next();
    }
    )(req, res, next);
  }

router.route('/')
    .get(authenticateJwt, confirmationController.getForm)
    .post(passport.authenticate('jwt', {session: false}), confirmationController.confirm);

module.exports = router;
