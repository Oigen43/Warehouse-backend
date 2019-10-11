'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const driverQuerySchema = require('@routing/driverRoutes/ValidatorSchema');
const driverController = require('@controllers/driverController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.get('/:id', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.drivers.update), driverController.getById);

router.route('/')
    .get(expressJoi(driverQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.drivers.read), driverController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.drivers.create), driverController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.drivers.update), driverController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.drivers.delete), driverController.remove);

module.exports = router;
