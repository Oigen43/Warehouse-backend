'use strict';

const routeUtils = require('../utils/routeUtils');
const companyPaginationService = require('../services/companyPaginationService');

function get(req) {
    const page = req.params.page;
    const perPage = req.params.per_page;
    return companyPaginationService.get(page, perPage);
}

module.exports = {
    get: routeUtils.handleResponse(get)
};
