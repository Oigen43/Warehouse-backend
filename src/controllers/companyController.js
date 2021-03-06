'use strict';

const routeUtils = require('@utils/routeUtils');
const companyService = require('@services/companyService');
const statusCode = require('@const/statusCode');

function get(req) {
    const { page, perPage } = req.query;
    return companyService.get(page, perPage, req.user.companyId);
}

function getById(req) {
    const { id } = req.params;
    return companyService.getById(id);
}

function updateActive(req) {
    const company = req.body;
    return companyService.updateActive(company);
}

function changePrice(req) {
    const company = req.body;
    return companyService.changePrice(company);
}

function getPrices(req) {
    const date = req.query;
    return companyService.getPrices(date);
}

function create(req) {
    const { company, priceForm, user } = req.body;
    return companyService.create(company, priceForm, user);
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
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND),
    getById: routeUtils.handleResponse(getById, statusCode.OK, statusCode.NOT_FOUND),
    updateActive: routeUtils.handleResponse(updateActive, statusCode.OK, statusCode.CONFLICT),
    changePrice: routeUtils.handleResponse(changePrice, statusCode.OK, statusCode.CONFLICT),
    getPrices: routeUtils.handleResponse(getPrices, statusCode.OK, statusCode.NOT_FOUND)
};
