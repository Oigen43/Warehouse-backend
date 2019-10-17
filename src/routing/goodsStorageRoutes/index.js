'use strict';

const express = require('express');
const passport = require('passport');
const goodsStorageController = require('@controllers/goodsStorageController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.goodsStorage.create), goodsStorageController.create)
    .put(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.goodsStorage.update), goodsStorageController.update);

module.exports = router;
