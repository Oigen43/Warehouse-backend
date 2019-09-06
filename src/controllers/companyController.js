'use strict';

const routeUtils = require('../utils/routeUtils');
const companyService = require('../services/companyService');

function get(req) {
    const {page, perPage} = req.query;
    return companyService.get(page, perPage);
}

function create(req, res) {
    const newCompany = req.body;
    return companyService.create(newCompany, res);
}

module.exports = {
    get: routeUtils.handleResponse(get),
    create: routeUtils.handleResponse(create)
};
