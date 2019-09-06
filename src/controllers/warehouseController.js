'use strict';

const routeUtils = require('../utils/routeUtils');
const warehouseService = require('../services/warehouseService');
const statusCode = require('../const/statusCode');

function get(req) {
    const { page, perPage } = req.query;
    return warehouseService.get(page, perPage);
}

function create(req, res) {
    const { body: warehouse } = req;
    return warehouseService.create(warehouse, res);
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
    get: routeUtils.handleResponse(get, statusCode.OK),
    create: routeUtils.handleResponse(create, statusCode.CREATED),
    update: routeUtils.handleResponse(update, statusCode.OK),
    remove: routeUtils.handleResponse(remove, statusCode.OK)
};
