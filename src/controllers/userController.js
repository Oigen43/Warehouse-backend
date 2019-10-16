'use strict';

const routeUtils = require('@utils/routeUtils');
const filter = require('@utils/filter');
const userService = require('@services/userService');
const statusCode = require('@const/statusCode');

function get(req) {
    const { page, perPage } = req.query;
    return userService.get(page, perPage, req.user.companyId);
}

function getById(req) {
    const { id } = req.params;
    return userService.getById(id);
}

function create(req) {
    const { user } = req.body;
    return userService.create(user);
}

function update(req) {
    const { user } = req.body;
    const data = filter.removeEmptyFields(user);
    return userService.update(data);
}

function remove(req) {
    const { userId } = req.query;
    return userService.remove(userId);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.CONFLICT),
    remove: routeUtils.handleResponse(remove, statusCode.OK, statusCode.NOT_FOUND),
    getById: routeUtils.handleResponse(getById, statusCode.OK, statusCode.NOT_FOUND)
};
