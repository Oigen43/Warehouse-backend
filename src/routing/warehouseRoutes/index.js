'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const warehouseQuerySchema = require('./ValidatorSchema');
const warehouseController = require('../../controllers/warehouseController');

const router = express.Router();

router.route('/')
    .get(expressJoi(warehouseQuerySchema), passport.authenticate('jwt', {session: false}), warehouseController.get)
    .post(passport.authenticate('jwt', {session: false}), warehouseController.create)
    .put(passport.authenticate('jwt', {session: false}), warehouseController.update)
    .delete(passport.authenticate('jwt', {session: false}), warehouseController.remove);

module.exports = router;
