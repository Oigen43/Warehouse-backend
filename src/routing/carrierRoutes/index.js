'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const carrierQuerySchema = require('@routing/carrierRoutes/ValidatorSchema');
const carrierController = require('@controllers/carrierController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.get('/names', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.carriers.getNames), carrierController.getNames);
router.get('/:id', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.carriers.getById), carrierController.getById);

router.route('/')
    .get(expressJoi(carrierQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.carriers.read), carrierController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.carriers.create), carrierController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.carriers.update), carrierController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.carriers.delete), carrierController.remove);

module.exports = router;
