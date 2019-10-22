'use strict';

const express = require('express');

const router = express.Router();

const loginRoutes = require('@routing/loginRoutes');
const confirmationRoutes = require('@routing/confirmationRoutes');
const refreshTokenRoutes = require('@routing/refreshTokenRoutes');
const companyRoutes = require('@routing/companyRoutes');
const warehouseRoutes = require('@routing/warehouseRoutes');
const userRoutes = require('@routing/userRoutes');
const storageRoutes = require('@routing/storageRoutes');
const storageTypesRoutes = require('@routing/storageTypesRoutes');
const carrierRoutes = require('@routing/carrierRoutes');
const driverRoutes = require('@routing/driverRoutes');
const senderRoutes = require('@routing/senderRoutes');
const receiverRoutes = require('@routing/receiverRoutes');
const transportRoutes = require('@routing/transportRoutes');
const TTNRoutes = require('@routing/TTNRoutes');
const goodsRoutes = require('@routing/goodsRoutes');
const writeOffRoutes = require('@routing/writeOffRoutes');

router.use('/login', loginRoutes);
router.use('/confirmation', confirmationRoutes);
router.use('/refresh', refreshTokenRoutes);
router.use('/companies', companyRoutes);
router.use('/warehouses', warehouseRoutes);
router.use('/users', userRoutes);
router.use('/storages', storageRoutes);
router.use('/storage_types', storageTypesRoutes);
router.use('/carriers', carrierRoutes);
router.use('/drivers', driverRoutes);
router.use('/senders', senderRoutes);
router.use('/receivers', receiverRoutes);
router.use('/transport', transportRoutes);
router.use('/ttn', TTNRoutes);
router.use('/goods', goodsRoutes);
router.use('/write_off', writeOffRoutes);

module.exports = router;
