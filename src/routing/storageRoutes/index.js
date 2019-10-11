'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const storageQuerySchema = require('@routing/storageRoutes/ValidatorSchema');
const storageController = require('@controllers/storageController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.get('/:id', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.storages.update), storageController.getById);

router.route('/')
    .get(expressJoi(storageQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.storages.read), storageController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.storages.create), storageController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.storages.update), storageController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.storages.delete), storageController.remove);

module.exports = router;
