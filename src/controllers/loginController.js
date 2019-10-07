'use strict';

const routeUtils = require('../utils/routeUtils');
const loginService = require('../services/loginService');
const statusCode = require('../const/statusCode');

function login(req) {
    const { email, password } = req.body;
    return loginService.login(email, password);
}

module.exports = {
    login: routeUtils.handleResponse(login, statusCode.OK, statusCode.FORBIDDEN),
};
