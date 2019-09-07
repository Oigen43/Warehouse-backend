'use strict';

const warehouseRepository = require('../repositories/warehouseRepository');

class WarehouseService {
    constructor({warehouseRepository}) {
        this.warehouseRepository = warehouseRepository;
    }

    async get(page, perPage, companyName) {
        const {warehouses, warehousesTotal} = await this.warehouseRepository.get(page, perPage, companyName);

        if (!warehouses) {
            return [];
        }

        return {
            warehouses,
            warehousesTotal
        };
    }

    async create(warehouse, res) {
        const message = await this.warehouseRepository.create(warehouse, res);
        return message;
    }

    async update(warehouse, res) {
        const message = await this.warehouseRepository.update(warehouse, res);
        return message;
    }

    async remove(warehouseName, res) {
        const message = await this.warehouseRepository.remove(warehouseName, res);
        return message;
    }
}

module.exports = new WarehouseService({warehouseRepository});
