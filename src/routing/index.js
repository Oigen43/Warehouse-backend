'use strict';

const express = require('express');

const router = express.Router();

const companyRoutes = require('./companyRoutes');
const warehouseRoutes = require('./warehouseRoutes');
const userRoutes = require('./userRoutes');

router.use('/', companyRoutes);
router.use('/', warehouseRoutes);
router.use('/', userRoutes);

module.exports = router;
