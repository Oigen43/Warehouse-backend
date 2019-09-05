'use strict';

const routeUtils = require('../utils/routeUtils');
const companyService = require('../services/companyService');

function get(req) {
    const page = req.query.page;
    const perPage = req.query.per_page;
    return companyService.get(page, perPage);
}

function create(req) {
    const newCompany = req.body;
    return companyService.create(newCompany);
}

module.exports = {
    get: routeUtils.handleResponse(get),
    create: routeUtils.handleResponse(create)
};
