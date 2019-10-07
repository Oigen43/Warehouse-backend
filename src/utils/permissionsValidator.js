'use strict';

const statusCode = require('../const/statusCode');
const messageCode = require('../const/messageCode');
module.exports = function (routesPermissions) {
    return async function (req, res, next) {
        if (req.authInfo.some(item => routesPermissions.includes(item))) { return next(); }

        res.status(statusCode.FORBIDDEN).send({
            data: {
                statusCode: messageCode.USER_AUTHORIZATION_ERROR,
            }
        });
    };
};
