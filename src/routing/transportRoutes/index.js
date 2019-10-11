'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const transportQuerySchema = require('@routing/transportRoutes/ValidatorSchema');
const transportController = require('@controllers/transportController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.get('/:id', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.transport.update), transportController.getById);

router.route('/')
    .get(expressJoi(transportQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.transport.read), transportController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.transport.create), transportController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.transport.update), transportController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.transport.delete), transportController.remove);

module.exports = router;
