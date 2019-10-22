'use strict';

const express = require('express');
const passport = require('passport');
const writeOffController = require('@controllers/writeOffController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.writeOff.create), writeOffController.create);

module.exports = router;
