'use strict';

const express = require('express');

const router = express.Router();

const loginRoutes = require('./loginRoutes');
const companyRoutes = require('./companyRoutes');
const warehouseRoutes = require('./warehouseRoutes');
const userRoutes = require('./userRoutes');
const storageRoutes = require('./storageRoutes');

router.use('/login', loginRoutes);
router.use('/companies', companyRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/users', userRoutes);
router.use('/storages', storageRoutes);

module.exports = router;
