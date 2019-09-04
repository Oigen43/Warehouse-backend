'use strict';

const data = require('../db/warehouses');

class WarehouseRepository {
    async get(page = 1, perPage = 10) {
        const warehouses = data;

        const start = (page - 1) * perPage;
        const end = start + perPage;

        const pagedWarehouses = warehouses.slice(start, end);

        return {
            warehouses: pagedWarehouses,
            warehousesTotal: warehouses.length
        };
    }
}

module.exports = new WarehouseRepository();
