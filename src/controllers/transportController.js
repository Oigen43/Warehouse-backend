'use strict';

const routeUtils = require('@utils/routeUtils');
const transportService = require('@services/transportService');
const statusCode = require('@const/statusCode');

function get(req) {
    const { page, perPage, carrierId } = req.query;
    return transportService.get(page, perPage, carrierId);
}

function getById(req) {
    const { id } = req.params;
    return transportService.getById(id);
}

function create(req) {
    const { body: transport } = req;
    return transportService.create(transport);
}

function update(req) {
    const { body: transport } = req;
    return transportService.update(transport);
}

function remove(req) {
    const { transportId } = req.query;
    return transportService.remove(transportId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.CONFLICT),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND),
    getById: routeUtils.handleResponse(getById, statusCode.OK, statusCode.NOT_FOUND)
};
