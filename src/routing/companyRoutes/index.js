'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const companyQuerySchema = require('./ValidatorSchema');
const companyController = require('../../controllers/companyController');

const router = express.Router();

router.route('/')
    .get(expressJoi(companyQuerySchema), passport.authenticate('jwt', {session: false}), companyController.get)
    .post(passport.authenticate('jwt', {session: false}), companyController.create)
    .put(passport.authenticate('jwt', {session: false}), companyController.update)
    .delete(passport.authenticate('jwt', {session: false}), companyController.remove);

module.exports = router;
