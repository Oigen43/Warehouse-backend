'use strict';

const routeUtils = require('@utils/routeUtils');
const receiverService = require('@services/receiverService');
const statusCode = require('@const/statusCode');

function get(req) {
    const { page, perPage } = req.query;
    return receiverService.get(page, perPage);
}

function create(req) {
    const receiver = req.body;
    return receiverService.create(receiver);
}

function update(req) {
    const receiver = req.body;
    return receiverService.update(receiver);
}

function remove(req) {
    const { receiverId } = req.query;
    return receiverService.remove(receiverId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.NOT_FOUND),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND)
};
