'use strict';

const routeUtils = require('../utils/routeUtils');
const companyService = require('../services/companyService');

function get(req) {
    const { page, perPage } = req.query;
    return companyService.get(page, perPage);
}

module.exports = {
    get: routeUtils.handleResponse(get)
};
