'use strict';

const routeUtils = require('../utils/routeUtils');
const refreshTokenService = require('../services/refreshTokenService');
const statusCode = require('../const/statusCode');

function refresh(req) {
    const userId = req.user.id;
    return refreshTokenService.refresh(userId);
}

module.exports = {
    refresh: routeUtils.handleResponse(refresh, statusCode.OK, statusCode.UNAUTHORIZED),
};
