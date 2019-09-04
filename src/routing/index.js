'use strict';

const express = require('express');

const router = express.Router();

const companyRoutes = require('./companyRoutes');
const warehouseRoutes = require('./warehouseRoutes');

router.use('/', companyRoutes);
router.use('/', warehouseRoutes);

module.exports = router;
