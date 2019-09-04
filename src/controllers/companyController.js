'use strict';

const routeUtils = require('../utils/routeUtils');
const companyService = require('../services/companyService');

function read(req) {
    const { page, perPage } = req.query;
    return companyService.read(page, perPage);
}

module.exports = {
    read: routeUtils.handleResponse(read)
};
