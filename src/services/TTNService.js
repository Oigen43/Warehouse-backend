'use strict';

const { sequelize } = require('@models');
const TTNRepository = require('@repositories/TTNRepository');
const goodsRepository = require('@repositories/goodsRepository');
const roleStatusesTTN = require('@const/roleStatusesTTN');

class TTNService {
    constructor({ TTNRepository, goodsRepository }) {
        this.TTNRepository = TTNRepository;
        this.goodsRepository = goodsRepository;
    }

    async get(page, perPage, role) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const statuses = roleStatusesTTN[role];
            const data = await this.TTNRepository.get({ page: page, perPage: perPage, statuses: statuses }, transaction);
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
            const { data, TTNId } = await this.TTNRepository.getById(id, transaction);
            data.data.TTN.dataValues.goods = await this.goodsRepository.get(TTNId, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async create(TTN, goods) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const { data, TTNId } = await this.TTNRepository.create(TTN, transaction);
            await this.goodsRepository.create(goods, TTNId, transaction);
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
            const { data, TTNId } = await this.TTNRepository.update(TTN, transaction);
            await this.goodsRepository.destroy(TTNId, transaction);
            await this.goodsRepository.create(goods, TTNId, transaction);
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

    async changeStatus(id) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.TTNRepository.changeStatus(id, transaction);
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

module.exports = new TTNService({ TTNRepository, goodsRepository });
