'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const TTNQuerySchema = require('@routing/TTNRoutes/ValidatorSchema');
const TTNController = require('@controllers/TTNController');

const router = express.Router();

router.route('/')
    .get(expressJoi(TTNQuerySchema), passport.authenticate('jwt', { session: false }), TTNController.get)
    .put(passport.authenticate('jwt', { session: false }), TTNController.update)
    .delete(passport.authenticate('jwt', { session: false}), TTNController.remove);

module.exports = router;
