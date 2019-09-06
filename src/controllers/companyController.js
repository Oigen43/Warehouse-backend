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
    return companyService.create(newCompany, res);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK),
    create: routeUtils.handleResponse(create, statusCode.CREATED)
};
