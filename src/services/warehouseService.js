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
}

module.exports = new WarehouseService({warehouseRepository});
