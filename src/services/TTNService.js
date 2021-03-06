'use strict';

const {sequelize} = require('@models');
const TTNRepository = require('@repositories/TTNRepository');
const goodsRepository = require('@repositories/goodsRepository');
const archivedGoodsRepository = require('@repositories/archivedGoodsRepository');
const roleStatusesTTN = require('@const/roleStatusesTTN');

class TTNService {
    constructor({TTNRepository, goodsRepository, archivedGoodsRepository}) {
        this.TTNRepository = TTNRepository;
        this.goodsRepository = goodsRepository;
        this.archivedGoodsRepository = archivedGoodsRepository;
    }

    async get(page, perPage, role) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const statuses = roleStatusesTTN[role];
            const data = await this.TTNRepository.get({
                page: page,
                perPage: perPage,
                statuses: statuses
            }, transaction);
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
            const data = await this.TTNRepository.getById(id, transaction);
            if (!data.data.TTN.Goods.length) {
                const TTNId = data.data.TTN.id;
                data.data.TTN.dataValues.Goods = await this.archivedGoodsRepository.get(TTNId, transaction);
            }
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async create(newTTN, TTN, goods) {
        let transaction;
        let data;
        let TTNId;
        try {
            transaction = await sequelize.transaction();

            if (TTN) {
                ({ data, TTNId } = await this.TTNRepository.create(newTTN, transaction));
                await Promise.all([
                    this.TTNRepository.update(TTN, transaction),
                    this.goodsRepository.updateTTNId(TTN.id, TTNId, transaction),
                    this.archivedGoodsRepository.create(goods, TTN.id, transaction)
                ]);
            } else {
                ({ data, TTNId } = await this.TTNRepository.create(newTTN, transaction));
                await this.goodsRepository.create(goods, TTNId, transaction);
            }
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async update(TTN, goods) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const {data, TTNId} = await this.TTNRepository.update(TTN, transaction);
            if (goods) {
                await Promise.all([
                    this.goodsRepository.destroy(TTNId, transaction),
                    this.goodsRepository.create(goods, TTNId, transaction)
                ]);
            }
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async remove(id) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.TTNRepository.remove(id, transaction);
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

module.exports = new TTNService({
    TTNRepository,
    goodsRepository,
    archivedGoodsRepository
});
