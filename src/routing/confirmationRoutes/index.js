'use strict';

const express = require('express');
const passport = require('passport');
const confirmationController = require('@controllers/confirmationController');

const router = express.Router();

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), confirmationController.getForm)
    .post(passport.authenticate('jwt', {session: false}), confirmationController.confirm);

module.exports = router;
