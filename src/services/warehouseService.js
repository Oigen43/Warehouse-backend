'use strict';

const warehouseRepository = require('../repositories/warehouseRepository');

class WarehouseService {
    constructor({warehouseRepository}) {
        this.warehouseRepository = warehouseRepository;
    }

    async read(page, perPage) {
        const {warehouses, warehousesTotal} = await this.warehouseRepository.read(page, perPage);

        if (!warehouses) {
            return [];
        }

        return {
            warehouses,
            warehousesTotal
        };
    }

    async create(warehouse) {
        const message = await this.warehouseRepository.create(warehouse);
        if (message) { return message; }
    }
}

module.exports = new WarehouseService({warehouseRepository});
