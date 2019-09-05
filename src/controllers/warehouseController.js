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

module.exports = {
    get: routeUtils.handleResponse(get),
    create: routeUtils.handleResponse(create)
};
