'use strict';

const { sequelize } = require('@models');
const goodsRepository = require('@repositories/goodsRepository');
const goodsStorageRepository = require('@repositories/goodsStorageRepository');
const storageRepository = require('@repositories/storageRepository');
const TTNRepository = require('@repositories/TTNRepository');

class GoodsService {
    constructor({ goodsRepository, goodsStorageRepository, storageRepository, TTNRepository }) {
        this.goodsRepository = goodsRepository;
        this.goodsStorageRepository = goodsStorageRepository;
        this.storageRepository = storageRepository;
        this.TTNRepository = TTNRepository;
    }

    async get(TTNId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.goodsRepository.get(TTNId, transaction);
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
            const data = await this.goodsRepository.getById(id, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async release(goodsData, storageData, TTN) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            await Promise.all([
                this.goodsStorageRepository.destroy(goodsData, transaction),
                this.storageRepository.updateStorages(storageData, transaction)
            ]);
            const data = await this.TTNRepository.update(TTN, transaction);
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

module.exports = new GoodsService({ goodsRepository, goodsStorageRepository, storageRepository, TTNRepository });
