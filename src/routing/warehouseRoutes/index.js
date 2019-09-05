'use strict';

const express = require('express');
var expressJoi = require('express-joi-validator');
const warehouseQuerySchema = require('./ValidatorSchema');
const warehouseController = require('../../controllers/warehouseController');

const router = express.Router();

router.route('/warehouses')
    .get(expressJoi(warehouseQuerySchema), warehouseController.get)
    .post(warehouseController.create);

module.exports = router;
