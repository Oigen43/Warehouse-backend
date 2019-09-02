'use strict';

const express = require('express');
var expressJoi = require('express-joi-validator');
const companyQuerySchema = require('./validatorSchema/companyRoutesValidatorSchema');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.get('/companies', expressJoi(companyQuerySchema), companyController.get);

module.exports = router;
