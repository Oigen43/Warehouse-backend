'use strict';

const routeUtils = require('@utils/routeUtils');
const warehouseService = require('@services/warehouseService');
const statusCode = require('@const/statusCode');

function get(req) {
    const { page, perPage, companyId} = req.query;
    return warehouseService.get(page, perPage, companyId);
}

function getById(req) {
    const { id } = req.params;
    return warehouseService.getById(id);
}

function getIds(req) {
    const { companyId } = req.query;
    return warehouseService.getIds(companyId);
}

function create(req) {
    const { body: warehouse } = req;
    return warehouseService.create(warehouse);
}

function update(req) {
    const { body: warehouse } = req;
    return warehouseService.update(warehouse);
}

function remove(req) {
    const { warehouseId } = req.query;
    return warehouseService.remove(warehouseId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.CONFLICT),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND),
    getById: routeUtils.handleResponse(getById, statusCode.OK, statusCode.NOT_FOUND),
    getIds: routeUtils.handleResponse(getIds, statusCode.OK, statusCode.NOT_FOUND)
};
