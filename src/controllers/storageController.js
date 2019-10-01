'use strict';

const routeUtils = require('../utils/routeUtils');
const storageService = require('../services/storageService');
const statusCode = require('../const/statusCode');

function get(req) {
    const { page, perPage, warehouseId } = req.query;
    return storageService.get(page, perPage, warehouseId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND)
};
