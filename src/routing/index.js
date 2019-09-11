'use strict';

const express = require('express');

const router = express.Router();

const companyRoutes = require('./companyRoutes');
const warehouseRoutes = require('./warehouseRoutes');
const userRoutes = require('./userRoutes');

router.use('/companies', companyRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/users', userRoutes);

module.exports = router;
