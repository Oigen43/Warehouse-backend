'use strict';

const data = require('../db/warehouses');
const fs = require('fs').promises;
const path = require('path');
const fullPath = path.join(__dirname, '../db/warehouses.json');
const statusCode = require('../const/statusCode');

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

    async create(warehouse, res) {
        const warehouses = data;
        if (warehouses.some(item => { return item.name === warehouse.name; })) {
            return res.status(statusCode.CONFLICT).send({ message: 'This warehouse already exists' });
        }

        warehouses.push(warehouse);
        await fs.writeFile(fullPath, JSON.stringify(warehouses));
        return { message: 'Warehouse created' };
    }

    async update(warehouse) {
        const warehouses = data;
        const index = warehouses.findIndex(item => item.name === warehouse.name);

        warehouses[index] = warehouse;
        await fs.writeFile(fullPath, JSON.stringify(warehouses));
        return { message: 'Warehouse updated' };
    }

    async remove(warehouseName) {
        const warehouses = data;
        const index = warehouses.findIndex(item => item.name === warehouseName);

        warehouses.splice(index, 1);
        await fs.writeFile(fullPath, JSON.stringify(warehouses));
        return { message: 'Warehose deleted '};
    }
}

module.exports = new WarehouseRepository();
