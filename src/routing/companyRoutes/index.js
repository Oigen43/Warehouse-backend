'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const companyQuerySchema = require('./ValidatorSchema');
const companyController = require('../../controllers/companyController');

const router = express.Router();

router.route('/companies')
    .get(expressJoi(companyQuerySchema), companyController.get)
    .post(companyController.create)
    .put(companyController.update)
    .delete(companyController.remove);

module.exports = router;
