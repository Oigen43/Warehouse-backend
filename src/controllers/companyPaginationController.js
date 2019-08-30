'use strict';

const routeUtils = require('../utils/routeUtils');
const companyPaginationService = require('../services/companyPaginationService');

function get(req) {
    const page = parseInt(req.params.page, 10);
    const perPage = parseInt(req.params.per_page, 10);
    return companyPaginationService.get(page, perPage);
}

module.exports = {
    get: routeUtils.handleResponse(get)
};
