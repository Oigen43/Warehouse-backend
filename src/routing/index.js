'use strict';

const express = require('express');

const router = express.Router();

const loginRoutes = require('./loginRoutes');
const confirmationRoutes = require('./confirmationRoutes');
const companyRoutes = require('./companyRoutes');
const warehouseRoutes = require('./warehouseRoutes');
const userRoutes = require('./userRoutes');

router.use('/login', loginRoutes);
router.use('/confirmation', confirmationRoutes);
router.use('/companies', companyRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/users', userRoutes);

module.exports = router;
