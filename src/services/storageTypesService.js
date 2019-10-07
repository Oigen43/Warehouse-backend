'use strict';

const sequelize = require('../server/models').sequelize;
const storageTypesRepository = require('../repositories/storageTypesRepository');

class StorageTypesService {
    constructor({ storageTypesRepository }) {
        this.storageTypesRepository = storageTypesRepository;
    }

    async get() {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.storageTypesRepository.get(transaction);
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

module.exports = new StorageTypesService({storageTypesRepository});
