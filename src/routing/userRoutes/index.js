'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const userQuerySchema = require('./ValidatorSchema');
const userController = require('../../controllers/userController');

const router = express.Router();

router.route('/')
    .get(expressJoi(userQuerySchema), passport.authenticate('jwt', {session: false}), userController.get)
    .post(passport.authenticate('jwt', {session: false}), userController.create)
    .put(passport.authenticate('jwt', {session: false}), userController.update)
    .delete(passport.authenticate('jwt', {session: false}), userController.remove);

module.exports = router;
