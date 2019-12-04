'use strict';

const logger = require('@utils/logger');
const statusCode = require('@const/statusCode');
const CustomError = require('@const/customError');

function handleErrorResponse(err, req, res) {
    logger.error(err);
    res.status(err.statusCode || statusCode.SERVER_ERROR).send({message: err.message});
}

function handleResponse(handler, statusRes, statusErr) {
    return async (req, res) => {
        try {
            const data = await handler(req, res);
            return res.status(statusRes).json(data);
        } catch (err) {
            if (err instanceof CustomError) {
                return res.status(statusErr).json(err.message);
            }
            return handleErrorResponse(err, req, res);
        }
    };
}

module.exports = {
    handleResponse
};
