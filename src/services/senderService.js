'use strict';

const { sequelize } = require('../server/models');
const senderRepository = require('../repositories/senderRepository');

class SenderService {
    constructor({ senderRepository }) {
        this.senderRepository = senderRepository;
    }

    async get(page, perPage) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.senderRepository.get({ page: page, perPage: perPage }, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async create(sender) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.senderRepository.create(sender, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async update(sender) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.senderRepository.update(sender, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async remove(senderId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.senderRepository.remove(senderId, transaction);
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

module.exports = new SenderService({senderRepository});