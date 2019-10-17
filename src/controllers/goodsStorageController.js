'use strict';

const routeUtils = require('@utils/routeUtils');
const goodsStorageService = require('@services/goodsStorageService');
const statusCode = require('@const/statusCode');

function create(req) {
    const { body: data } = req;
    return goodsStorageService.create(data);
}

function update(req) {
    const { body: data } = req;
    return goodsStorageService.update(data);
}

module.exports = {
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT),
    update: routeUtils.handleResponse(update, statusCode.OK, statusCode.NOT_FOUND)
};
