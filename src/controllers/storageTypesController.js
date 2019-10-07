'use strict';

const routeUtils = require('../utils/routeUtils');
const storageTypesService = require('../services/storageTypesService');
const statusCode = require('../const/statusCode');

function get() {
    return storageTypesService.get();
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND)
};
