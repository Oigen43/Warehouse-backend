'use strict';

const routeUtils = require('../utils/routeUtils');
const warehouseService = require('../services/warehouseService');

function get(req) {
    const page = parseInt(req.query.page, 10);
    const perPage = parseInt(req.query.per_page, 10);
    return warehouseService.get(page, perPage);
}

module.exports = {
    get: routeUtils.handleResponse(get)
};
