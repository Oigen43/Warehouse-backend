'use strict';

const { sequelize } = require('@models');
const warehouseRepository = require('@repositories/warehouseRepository');

class WarehouseService {
    constructor({ warehouseRepository }) {
        this.warehouseRepository = warehouseRepository;
    }

    async get(page, perPage, companyId, status) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = status === 'getNames' ? await this.warehouseRepository.getNames({ companyId: companyId }, transaction)
                : await this.warehouseRepository.get({ page: page, perPage: perPage, companyId: companyId }, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async getById(id) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.warehouseRepository.getById(id, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async getIds(companyId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.warehouseRepository.getIds(companyId, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async create(warehouse) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.warehouseRepository.create(warehouse, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async update(warehouse) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.warehouseRepository.update(warehouse, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async remove(warehouseId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.warehouseRepository.remove(warehouseId, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }
}

module.exports = new WarehouseService({warehouseRepository});
