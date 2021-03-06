'use strict';

const routeUtils = require('@utils/routeUtils');
const statusCode = require('@const/statusCode');
const TTNService = require('@services/TTNService');

function get(req) {
    const { page, perPage } = req.query;
    const role = req.authInfo;
    return TTNService.get(page, perPage, role);
}

function create(req) {
    const { newTTN, TTN, goods } = req.body;
    return TTNService.create(newTTN, TTN, goods);
}

function update(req) {
    const { TTN, goods } = req.body;
    return TTNService.update(TTN, goods);
}

function remove(req) {
    const { TTNId } = req.query;
    return TTNService.remove(TTNId);
}

function getById(req) {
    const { id } = req.params;
    return TTNService.getById(id);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    create: routeUtils.handleResponse(create, statusCode.OK, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.CONFLICT),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND),
    getById: routeUtils.handleResponse(getById, statusCode.OK, statusCode.NOT_FOUND)
};
