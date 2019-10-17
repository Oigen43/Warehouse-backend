'use strict';

const { sequelize } = require('@models');
const goodsStorageRepository = require('@repositories/goodsStorageRepository');

class GoodsStorageService {
    constructor({ goodsStorageRepository }) {
        this.goodsStorageRepository = goodsStorageRepository;
    }

    async create(goodsStorage) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.goodsStorageRepository.create(goodsStorage.data, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async update(goodsStorage) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.goodsStorageRepository.update(goodsStorage.data, transaction);
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

module.exports = new GoodsStorageService({goodsStorageRepository});
