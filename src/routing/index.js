'use strict';

const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const companyPaginationController = require('../controllers/companyPaginationController');

router.get('/companies', companyController.get);
router.get('/companies/?page=:page&per_page=:per_page', companyPaginationController.get);

module.exports = router;
