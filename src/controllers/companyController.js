'use strict';

const routeUtils = require('../utils/routeUtils');
const companyService = require('../services/companyService');

function get() {
    return companyService.get();
}

module.exports = {
    get: routeUtils.handleResponse(get)
};
