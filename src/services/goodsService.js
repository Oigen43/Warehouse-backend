'use strict';

const { sequelize } = require('@models');
const goodsRepository = require('@repositories/goodsRepository');

class GoodsService {
    constructor({goodsRepository}) {
        this.goodsRepository = goodsRepository;
    }

    async get() {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.goodsRepository.get(transaction);
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
}

module.exports = new GoodsService({goodsRepository});
