'use strict';

const routeUtils = require('../utils/routeUtils');
const warehouseService = require('../services/warehouseService');

function read(req) {
    const { page, perPage } = req.query;
    return warehouseService.read(page, perPage);
}

function create(req) {
    const warehouse = req.body;
    return warehouseService.create(warehouse);
}

module.exports = {
    read: routeUtils.handleResponse(read),
    create: routeUtils.handleResponse(create)
};
