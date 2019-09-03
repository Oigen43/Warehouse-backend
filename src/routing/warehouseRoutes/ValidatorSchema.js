const joi = require('joi');

const warehouseQuerySchema = {
    query: {
        page: joi.number().default(1).min(1).max(100),
        per_page: joi.number().default(10).min(1).max(1000),
    }
};

module.exports = warehouseQuerySchema;
