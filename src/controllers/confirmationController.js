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
    return confirmationService.confirm(user);
}

module.exports = {
    getForm: routeUtils.handleResponse(getForm, statusCode.OK, statusCode.FORBIDDEN),
    confirm: routeUtils.handleResponse(confirm, statusCode.OK, statusCode.FORBIDDEN),
};
