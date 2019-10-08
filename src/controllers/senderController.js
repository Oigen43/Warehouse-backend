'use strict';

const routeUtils = require('@utils/routeUtils');
const senderService = require('@services/senderService');
const statusCode = require('@const/statusCode');

function get(req) {
    const { page, perPage } = req.query;
    return senderService.get(page, perPage);
}

function create(req) {
    const sender = req.body;
    return senderService.create(sender);
}

function update(req) {
    const sender = req.body;
    return senderService.update(sender);
}

function remove(req) {
    const { senderId } = req.query;
    return senderService.remove(senderId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.NOT_FOUND),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND)
};
