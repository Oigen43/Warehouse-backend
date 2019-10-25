'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const companyQuerySchema = require('@routing/companyRoutes/ValidatorSchema');
const companyController = require('@controllers/companyController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.get('/getPrices', passport.authenticate('jwt', { session: false }), permissionsCheck(routesPermissions.companies.delete), companyController.getPrices);
router.put('/changeActive', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.companies.delete), companyController.updateActive);
router.get('/:id', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.companies.getById), companyController.getById);

router.route('/')
    .get(expressJoi(companyQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.companies.read), companyController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.companies.create), companyController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.companies.update), companyController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.companies.delete), companyController.remove);

module.exports = router;
