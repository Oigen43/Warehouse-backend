'use strict';

const logger = require('../utils/logger');
const statusCode = require('../const/statusCode');

function handleErrorResponse(err, req, res) {
    logger.error(err);
    res.status(err.statusCode || statusCode.SERVER_ERROR).send({message: err.message});
}

function handleResponse(handler, resStatusCode) {
    return async (req, res) => {
        try {
            const data = await handler(req, res);

            if (data) {
                return res.status(resStatusCode).send(data);
            } else {
                return res.status(statusCode.NO_CONTENT).send();
            }
        } catch (err) {
            return handleErrorResponse(err, req, res);
        }
    };
}

module.exports = {
    handleResponse
};
