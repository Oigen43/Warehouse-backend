'use strict';

const routeUtils = require('../utils/routeUtils');
const companyService = require('../services/companyService');
const statusCode = require('../const/statusCode');

function get(req) {
    const {page, perPage} = req.query;
    return companyService.get(page, perPage);
}

function create(req, res) {
    const newCompany = req.body;
    return companyService.create(newCompany);
}

function update(req, res) {
    const company = req.body;
    return companyService.update(company);
}

function remove(req, res) {
    const company = req.body;
    return companyService.remove(company);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.CONFLICT),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.CONFLICT),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.CONFLICT)
};
