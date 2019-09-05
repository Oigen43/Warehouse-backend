'use strict';

const routeUtils = require('../utils/routeUtils');
const warehouseService = require('../services/warehouseService');

function get(req) {
    const { page, perPage } = req.query;
    return warehouseService.get(page, perPage);
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
    get: routeUtils.handleResponse(get),
    create: routeUtils.handleResponse(create),
    update: routeUtils.handleResponse(update),
    remove: routeUtils.handleResponse(remove)
};
