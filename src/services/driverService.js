'use strict';

const { sequelize } = require('@models');
const driverRepository = require('@repositories/driverRepository');

class DriverService {
    constructor({ driverRepository }) {
        this.driverRepository = driverRepository;
    }

    async get(page, perPage, carrierId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.driverRepository.get({ page: page, perPage: perPage, carrierId: carrierId }, transaction);
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
            const data = await this.driverRepository.getById(id, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async create(driver) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.driverRepository.create(driver, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async update(driver) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.driverRepository.update(driver, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async remove(driverId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.driverRepository.remove(driverId, transaction);
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

module.exports = new DriverService({driverRepository});
