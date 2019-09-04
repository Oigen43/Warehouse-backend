'use strict';

const data = require('../db/warehouses');
const fs = require('fs');
const path = require('path');
const fullPath = path.join(__dirname, '../db/warehouses.json');
const logger = require('../utils/logger');

class WarehouseRepository {
    async read(page = 1, perPage = 10) {
        const warehouses = data;

        const start = (page - 1) * perPage;
        const end = start + perPage;

        const pagedWarehouses = warehouses.slice(start, end);

        return {
            warehouses: pagedWarehouses,
            warehousesTotal: warehouses.length
        };
    }

    async create(warehouse) {
        const warehouses = data;
        warehouses.push(warehouse);

        fs.writeFile(fullPath, JSON.stringify(warehouses), (err) => {
            if (err) {
                logger.error('Unhandled rejection (reason: ', err);
            };
        });
    }
}

module.exports = new WarehouseRepository();
