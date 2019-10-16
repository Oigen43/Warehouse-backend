'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const userQuerySchema = require('@routing/userRoutes/ValidatorSchema');
const userController = require('@controllers/userController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.get('/:id', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.users.getById), userController.getById);

router.route('/')
    .get(expressJoi(userQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.users.read), userController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.users.create), userController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.users.update), userController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.users.delete), userController.remove);

module.exports = router;
