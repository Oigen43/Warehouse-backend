'use strict';

const routeUtils = require('@utils/routeUtils');
const statusCode = require('@const/statusCode');
const TTNService = require('@services/TTNService');

function get(req) {
    const { page, perPage } = req.query;
    const role = req.authInfo;
    return TTNService.get(page, perPage, role);
}

function update(req) {
    const UpdatedTTN = req.body;
    return TTNService.update(UpdatedTTN);
}

function remove(req) {
    const { TTNId } = req.query;
    return TTNService.remove(TTNId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.NOT_FOUND),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND)
};
