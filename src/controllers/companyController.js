'use strict';

const routeUtils = require('../utils/routeUtils');
const companyService = require('../services/companyService');

function read(req) {
    const {page, perPage} = req.query;
    return companyService.read(page, perPage);
}

function create(req) {
    const newCompany = req.body;
    return companyService.create(newCompany);
}

module.exports = {
    read: routeUtils.handleResponse(read),
    create: routeUtils.handleResponse(create)
};
