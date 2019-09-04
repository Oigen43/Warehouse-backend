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
        await this.warehouseRepository.create(warehouse);
    }
}

module.exports = new WarehouseService({warehouseRepository});
