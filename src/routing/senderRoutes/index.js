'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const senderQuerySchema = require('./ValidatorSchema');
const senderController = require('../../controllers/senderController');
const permissionsCheck = require('../../utils/permissionsValidator');
const routesPermissions = require('../../const/routesPermissions');

const router = express.Router();

router.route('/')
    .get(expressJoi(senderQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.senders), senderController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.senders), senderController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.senders), senderController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.senders), senderController.remove);

module.exports = router;
