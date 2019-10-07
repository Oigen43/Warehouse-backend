'use strict';

const joi = require('joi');

const senderQuerySchema = {
    query: {
        page: joi.number().default(1).min(1).max(100),
        perPage: joi.number().default(10).min(1).max(1000),
    }
};

module.exports = senderQuerySchema;
