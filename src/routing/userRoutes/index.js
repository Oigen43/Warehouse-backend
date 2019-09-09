'use strict';

const express = require('express');
var expressJoi = require('express-joi-validator');
const userQuerySchema = require('./ValidatorSchema');
const userController = require('../../controllers/userController');

const router = express.Router();

router.route('/users')
    .get(expressJoi(userQuerySchema), userController.get)
    .post(userController.create)
    .put(userController.update)
    .delete(userController.remove);

module.exports = router;
