'use strict';

const routeUtils = require('@utils/routeUtils');
const writeOffService = require('@services/writeOffService');
const statusCode = require('@const/statusCode');

function create(req) {
    const { writeOff, goods } = req.body;
    return writeOffService.create(writeOff, goods);
}

module.exports = {
    create: routeUtils.handleResponse(create, statusCode.CREATED, statusCode.CONFLICT)
};
