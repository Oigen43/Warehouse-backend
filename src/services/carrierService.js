'use strict';

const { sequelize } = require('@models');
const carrierRepository = require('@repositories/carrierRepository');

class CarrierService {
    constructor({ carrierRepository }) {
        this.carrierRepository = carrierRepository;
    }

    async get(page, perPage) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.carrierRepository.get({ page: page, perPage: perPage }, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async create(carrier) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const { data } = await this.carrierRepository.create(carrier);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async update(carrier) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const { data } = await this.carrierRepository.update(carrier);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async remove(carrierId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.carrierRepository.remove(carrierId);
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

module.exports = new CarrierService({carrierRepository});
