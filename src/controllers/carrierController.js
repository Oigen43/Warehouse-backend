'use strict';

const routeUtils = require('@utils/routeUtils');
const carrierService = require('@services/carrierService');
const statusCode = require('@const/statusCode');

function get(req) {
    const { page, perPage } = req.query;
    return carrierService.get(page, perPage);
}

function getById(req) {
    const { id } = req.params;
    return carrierService.getById(id);
}

function create(req) {
    const carrier = req.body;
    return carrierService.create(carrier);
}

function update(req) {
    const carrier = req.body;
    return carrierService.update(carrier);
}

function remove(req) {
    const { carrierId } = req.query;
    return carrierService.remove(carrierId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.CONFLICT),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND),
    getById: routeUtils.handleResponse(getById, statusCode.OK, statusCode.NOT_FOUND)
};
