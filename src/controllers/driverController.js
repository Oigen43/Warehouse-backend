'use strict';

const routeUtils = require('@utils/routeUtils');
const driverService = require('@services/driverService');
const statusCode = require('@const/statusCode');

function get(req) {
    const { page, perPage, carrierId } = req.query;
    return driverService.get(page, perPage, carrierId);
}

function getById(req) {
    const { id } = req.params;
    return driverService.getById(id);
}

function getNames(req) {
    const { carrierId } = req.query;
    return driverService.getNames(carrierId);
}

function create(req) {
    const { body: driver } = req;
    return driverService.create(driver);
}

function update(req) {
    const { body: driver } = req;
    return driverService.update(driver);
}

function remove(req) {
    const { driverId } = req.query;
    return driverService.remove(driverId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.CONFLICT),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND),
    getById: routeUtils.handleResponse(getById, statusCode.OK, statusCode.NOT_FOUND),
    getNames: routeUtils.handleResponse(getNames, statusCode.OK, statusCode.NOT_FOUND),
};
