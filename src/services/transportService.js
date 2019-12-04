'use strict';

const { sequelize } = require('@models');
const transportRepository = require('@repositories/transportRepository');

class TransportService {
    constructor({ transportRepository }) {
        this.transportRepository = transportRepository;
    }

    async get(page, perPage, carrierId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.transportRepository.get({ page: page, perPage: perPage, carrierId: carrierId }, transaction);
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
            const data = await this.transportRepository.getById(id, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async getNames(carrierId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.transportRepository.getNames(carrierId, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async create(transport) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.transportRepository.create(transport, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async update(transport) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.transportRepository.update(transport, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async remove(transportId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.transportRepository.remove(transportId, transaction);
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

module.exports = new TransportService({transportRepository});
