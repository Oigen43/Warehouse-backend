'use strict';

const warehouseRepository = require('../repositories/warehouseRepository');

class WarehouseService {
    constructor({ warehouseRepository }) {
        this.warehouseRepository = warehouseRepository;
    }

    async get(page, perPage, companyName) {
        const data = await this.warehouseRepository.get(page, perPage, companyName);

        if (!data) {
            return [];
        }
        return data;
    }

    async create(warehouse) {
        const data = await this.warehouseRepository.create(warehouse);
        return data;
    }

    async update(warehouse) {
        const data = await this.warehouseRepository.update(warehouse);
        return data;
    }

    async remove(warehouse) {
        const data = await this.warehouseRepository.remove(warehouse);
        return data;
    }
}

module.exports = new WarehouseService({warehouseRepository});
