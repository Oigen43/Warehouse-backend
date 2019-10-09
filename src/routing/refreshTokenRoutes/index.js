'use strict';

const express = require('express');
const passport = require('passport');
const refreshTokenController = require('@controllers/refreshTokenController');

const router = express.Router();

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), refreshTokenController.refresh);

module.exports = router;
