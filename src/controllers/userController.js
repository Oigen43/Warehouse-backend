'use strict';

const routeUtils = require('../utils/routeUtils');
const userService = require('../services/userService');
const statusCode = require('../const/statusCode');

function get(req) {
    const { page, perPage } = req.query;
    return userService.get(page, perPage);
}

function create(req) {
    const { body: user } = req;
    return userService.create(user);
}

function update(req) {
    const { body: user } = req;
    return userService.update(user);
}

function remove(req) {
    const { userId } = req.query;
    return userService.remove(userId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.NOT_FOUND),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND)
};
