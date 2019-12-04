'use strict';

const routeUtils = require('@utils/routeUtils');
const goodsService = require('@services/goodsService');
const statusCode = require('@const/statusCode');

function get(req) {
    const { TTNId } = req.query;
    return goodsService.get(TTNId);
}

function getById(req) {
    const { id } = req.params;
    return goodsService.getById(id);
}

function release(req) {
    const { goodsData, storageData, TTN } = req.body;
    return goodsService.release(goodsData, storageData, TTN);
}

module.exports = {
    get: routeUtils.handleResponse(get, statusCode.OK, statusCode.NOT_FOUND),
    getById: routeUtils.handleResponse(getById, statusCode.OK, statusCode.NOT_FOUND),
    release: routeUtils.handleResponse(release, statusCode.OK, statusCode.NOT_FOUND)
};
