'use strict';

const warehouseRepository = require('../repositories/warehouseRepository');

class WarehouseService {
    constructor({warehouseRepository}) {
        this.warehouseRepository = warehouseRepository;
    }

    async get(page, perPage) {
        const {warehouses, warehousesTotal} = await this.warehouseRepository.get(page, perPage);

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

    async update(warehouse) {
        const message = await this.warehouseRepository.update(warehouse);
        return message;
    }

    async remove(warehouseName) {
        const message = await this.warehouseRepository.remove(warehouseName);
        return message;
    }
}

module.exports = new WarehouseService({warehouseRepository});
