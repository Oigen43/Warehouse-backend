'use strict';

const routeUtils = require('../utils/routeUtils');
const companyService = require('../services/companyService');
const statusCode = require('../const/statusCode');

function get(req) {
    const { page, perPage } = req.query;
    return companyService.get(page, perPage);
}

function create(req) {
    const { company, user } = req.body;
    return companyService.create(company, user);
}

function update(req) {
    const company = req.body;
    return companyService.update(company);
}

function remove(req) {
    const { companyId } = req.query;
    return companyService.remove(companyId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.CONFLICT),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND)
};
