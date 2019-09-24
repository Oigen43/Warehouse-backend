'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const companyQuerySchema = require('./ValidatorSchema');
const companyController = require('../../controllers/companyController');
const permissionsCheck = require('../../utils/permissionsValidator');
const routesPermissions = require('../../const/routesPermissions');

const router = express.Router();

router.route('/')
    .get(expressJoi(companyQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.companies), companyController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.companies), companyController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.companies), companyController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.companies), companyController.remove);

module.exports = router;
