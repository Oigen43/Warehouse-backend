'use strict';

const fs = require('fs').promises;
const path = require('path');
const fullPath = path.join(__dirname, '../db/warehouses.json');

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
                    message: 'This warehouse already exists'
                },
                done: false
            };
        }

        warehouses.push(warehouse);
        await fs.writeFile(fullPath, JSON.stringify(warehouses));
        return {
            data: {
                message: 'Warehouse created'
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
                    message: 'This warehouse does not exist'
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
                message: 'Warehouse updated'
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
                    message: 'This warehouse does not exist'
                },
                done: false
            };
        }

        warehouses[index].deleted = true;
        await fs.writeFile(fullPath, JSON.stringify(warehouses));
        return {
            data: {
                message: 'Warehose deleted'
            },
            done: true
        };
    }
}

module.exports = new WarehouseRepository();
