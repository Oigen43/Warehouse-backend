'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const TTNQuerySchema = require('@routing/TTNRoutes/ValidatorSchema');
const TTNController = require('@controllers/TTNController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.put('/confirm', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.TTN.confirm), TTNController.confirm);
router.put('/in_storage', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.TTN.inStorage), TTNController.inStorage);
router.get('/:id', passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.TTN.getById), TTNController.getById);

router.route('/')
    .get(expressJoi(TTNQuerySchema), passport.authenticate('jwt', { session: false }), permissionsCheck(routesPermissions.TTN.read), TTNController.get)
    .post(passport.authenticate('jwt', { session: false }), permissionsCheck(routesPermissions.TTN.create), TTNController.create)
    .put(passport.authenticate('jwt', { session: false }), permissionsCheck(routesPermissions.TTN.update), TTNController.update)
    .delete(passport.authenticate('jwt', { session: false}), permissionsCheck(routesPermissions.TTN.delete), TTNController.remove);

module.exports = router;
