'use strict';

const { sequelize } = require('@models');
const receiverRepository = require('@repositories/receiverRepository');

class ReceiverService {
    constructor({ receiverRepository }) {
        this.receiverRepository = receiverRepository;
    }

    async get(page, perPage) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.receiverRepository.get({ page: page, perPage: perPage }, transaction);
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
            const data = await this.receiverRepository.getById(id, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async create(receiver) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.receiverRepository.create(receiver, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async update(receiver) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.receiverRepository.update(receiver, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async remove(receiverId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.receiverRepository.remove(receiverId, transaction);
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

module.exports = new ReceiverService({receiverRepository});
