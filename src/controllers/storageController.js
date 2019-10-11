'use strict';

const routeUtils = require('@utils/routeUtils');
const storageService = require('@services/storageService');
const statusCode = require('@const/statusCode');

function get(req) {
    const { page, perPage, warehouseId } = req.query;
    return storageService.get(page, perPage, warehouseId);
}

function getById(req) {
    const { id } = req.params;
    return storageService.getById(id);
}

function create(req) {
    const { body: storage } = req;
    return storageService.create(storage);
}

function update(req) {
    const { body: storage } = req;
    return storageService.update(storage);
}

function remove(req) {
    const { storageId } = req.query;
    return storageService.remove(storageId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.NOT_FOUND),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND),
    getById: routeUtils.handleResponse(getById, statusCode.OK, statusCode.NOT_FOUND)
};
