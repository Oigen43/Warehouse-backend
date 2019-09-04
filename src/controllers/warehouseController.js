'use strict';

const routeUtils = require('../utils/routeUtils');
const warehouseService = require('../services/warehouseService');

function get(req) {
    const page = req.query.page;
    const perPage = req.query.per_page;
    return warehouseService.get(page, perPage);
}

module.exports = {
    get: routeUtils.handleResponse(get)
};
