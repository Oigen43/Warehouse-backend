'use strict';

const routeUtils = require('../utils/routeUtils');
const companyService = require('../services/companyService');

function get(req) {
    const page = req.query.page;
    const perPage = req.query.per_page;
    return companyService.get(page, perPage);
}

function create(req) {
    const { companyName, address, description} = req.body;
    return companyService.create(companyName, address, description);
}

module.exports = {
    get: routeUtils.handleResponse(get),
    create: routeUtils.handleResponse(create)
};
