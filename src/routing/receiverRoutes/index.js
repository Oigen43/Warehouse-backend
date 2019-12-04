'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const receiverQuerySchema = require('@routing/receiverRoutes/ValidatorSchema');
const receiverController = require('@controllers/receiverController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.get('/names', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.receivers.getNames), receiverController.getNames);
router.get('/:id', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.receivers.getById), receiverController.getById);

router.route('/')
    .get(expressJoi(receiverQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.receivers.read), receiverController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.receivers.create), receiverController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.receivers.update), receiverController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.receivers.delete), receiverController.remove);

module.exports = router;
