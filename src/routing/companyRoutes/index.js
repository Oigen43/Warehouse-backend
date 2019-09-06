'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const companyQuerySchema = require('./ValidatorSchema');
const companyController = require('../../controllers/companyController');

const router = express.Router();

router.get('/companies', expressJoi(companyQuerySchema), companyController.get);
router.post('/companies', companyController.create);

module.exports = router;
