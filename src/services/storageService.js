'use strict';

const sequelize = require('../server/models').sequelize;
const storageRepository = require('../repositories/storageRepository');

class StorageService {
    constructor({storageRepository}) {
        this.storageRepository = storageRepository;
    }

    async get(page, perPage, warehouseId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.storageRepository.get({ page: page, perPage: perPage, warehouseId: warehouseId }, transaction);
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

module.exports = new StorageService({storageRepository});
