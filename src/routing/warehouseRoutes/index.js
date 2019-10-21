'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const warehouseQuerySchema = require('@routing/warehouseRoutes/ValidatorSchema');
const warehouseController = require('@controllers/warehouseController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.get('/names', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.warehouses.read), warehouseController.getNames);
router.get('/:id', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.warehouses.update), warehouseController.getById);

router.route('/')
    .get(expressJoi(warehouseQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.warehouses.read), warehouseController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.warehouses.create), warehouseController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.warehouses.update), warehouseController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.warehouses.delete), warehouseController.remove);

module.exports = router;
