'use strict';

const routeUtils = require('@utils/routeUtils');
const filter = require('@utils/filter');
const confirmationService = require('@services/confirmationService');
const statusCode = require('@const/statusCode');

function getForm(req) {
    const { id } = req.user;
    return confirmationService.getForm(id);
}

function confirm(req) {
    const { user } = req.body;
    const data = filter.removeEmptyFields(user);
    data.id = req.user.id;
    data.email = req.user.email;
    data.confirmationToken = null;
    return confirmationService.confirm(data);
}

module.exports = {
    getForm: routeUtils.handleResponse(getForm, statusCode.OK, statusCode.FORBIDDEN),
    confirm: routeUtils.handleResponse(confirm, statusCode.OK, statusCode.FORBIDDEN),
};
