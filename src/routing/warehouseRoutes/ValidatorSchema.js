'use strict';

const joi = require('joi');

const warehouseQuerySchema = {
    query: {
        page: joi.number().default(1).min(1).max(100),
        perPage: joi.number().default(10).min(1).max(1000),
        companyId: joi.number(),
    }
};

module.exports = warehouseQuerySchema;
