'use strict';

const routeUtils = require('../utils/routeUtils');
const confirmationService = require('../services/confirmationService');
const statusCode = require('../const/statusCode');

function getForm(req) {
    const { id } = req.user;
    return confirmationService.getForm(id);
}

function confirm(req) {
    const { user } = req.body;
    user.id = req.user.id;
    user.email = req.user.email;
    user.firstName = req.user.firstName;
    return confirmationService.confirm(user);
}

module.exports = {
    getForm: routeUtils.handleResponse(getForm, statusCode.OK, statusCode.FORBIDDEN),
    confirm: routeUtils.handleResponse(confirm, statusCode.OK, statusCode.FORBIDDEN),
};
