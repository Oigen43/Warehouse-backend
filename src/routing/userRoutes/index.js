'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const userQuerySchema = require('./ValidatorSchema');
const userController = require('../../controllers/userController');
const permissionsCheck = require('../../utils/permissionsValidator');
const routesPermissions = require('../../const/routesPermissions');

const router = express.Router();

router.route('/')
    .get(expressJoi(userQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.users), userController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.users), userController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.users), userController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.users), userController.remove);

module.exports = router;
