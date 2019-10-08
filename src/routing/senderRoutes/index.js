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
    .get(expressJoi(senderQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.senders.read), senderController.get)
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.senders.create), senderController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.senders.update), senderController.update)
    .delete(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.senders.delete), senderController.remove);

module.exports = router;
