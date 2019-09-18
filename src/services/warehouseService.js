'use strict';

const warehouseRepository = require('../repositories/warehouseRepository');
const sequelize = require('../server/models').sequelize;

class WarehouseService {
    constructor({ warehouseRepository }) {
        this.warehouseRepository = warehouseRepository;
    }

    async get(page, perPage, companyName) {
        let data = {
            message: 'Transaction failed',
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.warehouseRepository.get({ page: page, perPage: perPage, companyName: companyName }, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }

    async create(warehouse) {
        let data = {
            message: 'Transaction failed',
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.warehouseRepository.create(warehouse, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }

    async update(warehouse) {
        let data = {
            message: 'Transaction failed',
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.warehouseRepository.update(warehouse, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }

    async remove(warehouse) {
        let data = {
            message: 'Transaction failed',
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.warehouseRepository.remove(warehouse, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }
}

module.exports = new WarehouseService({warehouseRepository});
