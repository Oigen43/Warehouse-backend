'use strict';

const warehouseRepository = require('../repositories/warehouseRepository');

class WarehouseService {
    constructor({warehouseRepository}) {
        this.warehouseRepository = warehouseRepository;
    }

    async get(page, perPage, companyName) {
        const { data, statusCode } = await this.warehouseRepository.get(page, perPage, companyName);

        if (!data) {
            return [];
        }

        return { data, statusCode };
    }

    async create(warehouse) {
        const { data, statusCode } = await this.warehouseRepository.create(warehouse);
        return { data, statusCode };
    }

    async update(warehouse) {
        const { data, statusCode } = await this.warehouseRepository.update(warehouse);
        return { data, statusCode };
    }

    async remove(warehouseName) {
        const { data, statusCode } = await this.warehouseRepository.remove(warehouseName);
        return { data, statusCode };
    }
}

module.exports = new WarehouseService({warehouseRepository});
