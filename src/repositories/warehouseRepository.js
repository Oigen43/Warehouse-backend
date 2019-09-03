'use strict';

const data = require('../db/warehouses');

class WarehouseRepository {
    async get(page = 1, perPage = 10) {
        const warehouses = data;

        const start = (page - 1) * perPage;
        const end = start + perPage;

        const pagedWarehouses = warehouses.slice(start, end);

        const limit = warehouses.length / perPage;

        return {
            warehouses: pagedWarehouses,
            pageLimit: limit
        };
    }
}

module.exports = new WarehouseRepository();
