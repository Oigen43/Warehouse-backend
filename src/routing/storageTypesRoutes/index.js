'use strict';

const express = require('express');
const passport = require('passport');
const storageTypesController = require('../../controllers/storageTypesController');
const permissionsCheck = require('../../utils/permissionsValidator');
const routesPermissions = require('../../const/routesPermissions');

const router = express.Router();

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.storageTypes.read), storageTypesController.get);

module.exports = router;
