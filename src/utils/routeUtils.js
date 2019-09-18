'use strict';

const logger = require('../utils/logger');
const statusCode = require('../const/statusCode');

function handleErrorResponse(err, req, res) {
    logger.error(err);
    res.status(err.statusCode || statusCode.SERVER_ERROR).send({message: err.message});
}

function handleResponse(handler, statusRes, statusErr) {
    return async (req, res) => {
        try {
            const data = await handler(req, res);
            if (data.done) {
                return res.status(statusRes).json(data);
            } else {
                return res.status(statusErr).json(data);
            }
        } catch (err) {
            return handleErrorResponse(err, req, res);
        }
    };
}

module.exports = {
    handleResponse
};
