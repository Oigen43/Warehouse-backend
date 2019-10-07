'use strict';

const express = require('express');

const router = express.Router();

const loginRoutes = require('./loginRoutes');
const confirmationRoutes = require('./confirmationRoutes');
const refreshTokenRoutes = require('./refreshTokenRoutes');
const companyRoutes = require('./companyRoutes');
const warehouseRoutes = require('./warehouseRoutes');
const userRoutes = require('./userRoutes');
const storageRoutes = require('./storageRoutes');
const storageTypesRoutes = require('./storageTypesRoutes');
const carrierRoutes = require('./carrierRoutes');

router.use('/login', loginRoutes);
router.use('/confirmation', confirmationRoutes);
router.use('/refresh', refreshTokenRoutes);
router.use('/companies', companyRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/users', userRoutes);
router.use('/storages', storageRoutes);
router.use('/storage_types', storageTypesRoutes);
router.use('/carriers', carrierRoutes);

module.exports = router;
