'use strict';

const express = require('express');
var expressJoi = require('express-joi-validator');
const warehouseQuerySchema = require('./ValidatorSchema');
const warehouseController = require('../../controllers/warehouseController');

const router = express.Router();

router.get('/warehouses', expressJoi(warehouseQuerySchema), warehouseController.read);
router.post('/warehouses/create', warehouseController.create);

module.exports = router;
