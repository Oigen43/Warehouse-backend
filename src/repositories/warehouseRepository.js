'use strict';

const fs = require('fs').promises;
const path = require('path');
const fullPath = path.join(__dirname, '../db/warehouses.json');
const messageCode = require('../const/messageCode');

class WarehouseRepository {
    async get(page = 1, perPage = 10, companyName) {
        const data = await fs.readFile(fullPath);
        const warehouses = JSON.parse(data);

        const warehousesFiltered = warehouses.filter(item => item.deleted === false && item.companyName === companyName);
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const pagedWarehouses = warehousesFiltered.slice(start, end);

        return {
            data: {
                warehouses: pagedWarehouses,
                warehousesTotal: warehousesFiltered.length
            },
            done: true
        };
    }

    async create(newWarehouse) {
        const data = await fs.readFile(fullPath);
        const warehouses = JSON.parse(data);
        const warehouse = {
            warehouseName: newWarehouse.warehouseName,
            companyName: newWarehouse.companyName,
            address: newWarehouse.address,
            type: newWarehouse.type,
            active: true,
            deleted: false,
        };

        if (warehouses.some(item => item.warehouseName === warehouse.warehouseName)) {
            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_EXISTS
                },
                done: false
            };
        }

        warehouses.push(warehouse);
        await fs.writeFile(fullPath, JSON.stringify(warehouses));
        return {
            data: {
                statusCode: messageCode.WAREHOUSE_CREATED
            },
            done: true
        };
    }

    async update(warehouse) {
        const data = await fs.readFile(fullPath);
        const warehouses = JSON.parse(data);

        const index = warehouses.findIndex(item => item.warehouseName === warehouse.warehouseName);
        if (index === -1) {
            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_NOT_EXIST
                },
                done: false
            };
        }

        warehouses[index].warehouseName = warehouse.warehouseName;
        warehouses[index].address = warehouse.address;
        warehouses[index].type = warehouse.type;
        await fs.writeFile(fullPath, JSON.stringify(warehouses));
        return {
            data: {
                statusCode: messageCode.WAREHOUSE_UPDATED
            },
            done: true
        };
    }

    async remove(warehouse) {
        const data = await fs.readFile(fullPath);
        const warehouses = JSON.parse(data);
        const index = warehouses.findIndex(item => item.warehouseName === warehouse.warehouseName);
        if (index === -1) {
            return {
                data: {
                    statusCode: messageCode.WAREHOUSE_NOT_EXIST
                },
                done: false
            };
        }

        warehouses[index].deleted = true;
        await fs.writeFile(fullPath, JSON.stringify(warehouses));
        return {
            data: {
                statusCode: messageCode.WAREHOUSE_DELETED
            },
            done: true
        };
    }
}

module.exports = new WarehouseRepository();
