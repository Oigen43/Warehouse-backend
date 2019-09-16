'use strict';

const express = require('express');
var expressJoi = require('express-joi-validator');
const warehouseQuerySchema = require('./ValidatorSchema');
const warehouseController = require('../../controllers/warehouseController');

const router = express.Router();

router.route('/')
    .get(expressJoi(warehouseQuerySchema), warehouseController.get)
    .post(warehouseController.create)
    .put(warehouseController.update)
    .delete(warehouseController.remove);

module.exports = router;
