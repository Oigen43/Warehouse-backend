'use strict';

const express = require('express');
const passport = require('passport');
const goodsController = require('@controllers/goodsController');
const permissionsCheck = require('@utils/permissionsValidator');
const routesPermissions = require('@const/routesPermissions');

const router = express.Router();

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), permissionsCheck(routesPermissions.goods.read), goodsController.get);

module.exports = router;
