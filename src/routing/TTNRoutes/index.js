'use strict';

const express = require('express');
const expressJoi = require('express-joi-validator');
const passport = require('passport');
const TTNQuerySchema = require('@routing/TTNRoutes/ValidatorSchema');
const TTNController = require('@controllers/TTNController');

const router = express.Router();

router.put('/changeStatus', passport.authenticate('jwt', {session: false}), TTNController.changeStatus);
router.get('/:id', passport.authenticate('jwt', {session: false}), TTNController.getById);

router.route('/')
    .get(expressJoi(TTNQuerySchema), passport.authenticate('jwt', { session: false }), TTNController.get)
    .post(passport.authenticate('jwt', { session: false }), TTNController.create)
    // .put(passport.authenticate('jwt', { session: false }), TTNController.update)
    .delete(passport.authenticate('jwt', { session: false}), TTNController.remove);

module.exports = router;
