'use strict';

const sequelize = require('../server/models').sequelize;
const storageRepository = require('../repositories/storageRepository');
const messageCode = require('../const/messageCode');

class StorageService {
    constructor({storageRepository}) {
        this.storageRepository = storageRepository;
    }

    async get(page, perPage, warehouseId) {
        let data = {
            statusCode: messageCode.TRANSACTION_FAILED,
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.storageRepository.get({
                page: page,
                perPage: perPage,
                warehouseId: warehouseId
            }, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
            }
        }

        return data;
    }
}

module.exports = new StorageService({storageRepository});
