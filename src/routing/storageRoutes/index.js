'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const storageQuerySchema = require('./ValidatorSchema');
const storageController = require('../../controllers/storageController');
const permissionsCheck = require('../../utils/permissionsValidator');
const routesPermissions = require('../../const/routesPermissions');

const router = express.Router();

router.route('/')
    .get(expressJoi(storageQuerySchema), passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.storages), storageController.get);

module.exports = router;
