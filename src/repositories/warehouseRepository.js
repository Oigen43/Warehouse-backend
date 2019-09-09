'use strict';

const fs = require('fs').promises;
const path = require('path');
const fullPath = path.join(__dirname, '../db/warehouses.json');
const statusCode = require('../const/statusCode');

class WarehouseRepository {
    async get(page = 1, perPage = 10, companyName) {
        const data = await fs.readFile(fullPath);
        const warehouses = JSON.parse(data);

        warehouses.filter(item => item.deleted === false && item.companyName === companyName);
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const pagedWarehouses = warehouses.slice(start, end);

        return {
            data: {
                warehouses: pagedWarehouses,
                warehousesTotal: warehouses.length
            },
            statusCode: statusCode.OK
        };
    }

    async create(warehouse) {
        const data = await fs.readFile(fullPath);
        const warehouses = JSON.parse(data);

        if (warehouses.some(item => { return item.name === warehouse.name; })) {
            return {
                data: {
                    message: 'This warehouse already exists'
                },
                statusCode: statusCode.CONFLICT
            };
        }
        warehouses.push(warehouse);
        await fs.writeFile(fullPath, JSON.stringify(warehouses));
        return {
            data: {
                message: 'Warehouse created'
            },
            statusCode: statusCode.CREATED
        };
    }

    async update(warehouse) {
        const data = await fs.readFile(fullPath);
        const warehouses = JSON.parse(data);

        const index = warehouses.findIndex(item => item.name === warehouse.name);
        if (index === -1) {
            return {
                data: {
                    message: 'This warehouse does not exist'
                },
                statusCode: statusCode.CONFLICT
            };
        }

        warehouses[index] = warehouse;
        await fs.writeFile(fullPath, JSON.stringify(warehouses));
        return {
            data: {
                message: 'Warehouse updated'
            },
            statusCode: statusCode.OK
        };
    }

    async remove(warehouseName) {
        const data = await fs.readFile(fullPath);
        const warehouses = JSON.parse(data);

        const index = warehouses.findIndex(item => item.name === warehouseName);
        if (index === -1) {
            return {
                data: {
                    message: 'This warehouse does not exist'
                },
                statusCode: statusCode.CONFLICT
            };
        }

        warehouses[index].deleted = true;
        await fs.writeFile(fullPath, JSON.stringify(warehouses));
        return {
            data: {
                message: 'Warehose deleted'
            },
            statusCode: statusCode.OK
        };
    }
}

module.exports = new WarehouseRepository();
