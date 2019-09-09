'use strict';

const routeUtils = require('../utils/routeUtils');
const warehouseService = require('../services/warehouseService');
const statusCode = require('../const/statusCode');

function get(req) {
    const { page, perPage, companyName } = req.query;
    return warehouseService.get(page, perPage, companyName);
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
    const { name } = req.body;
    return warehouseService.remove(name);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.CONFLICT),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.CONFLICT),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.CONFLICT)
};
