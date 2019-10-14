'use strict';

const { sequelize } = require('@models');
const TTNRepository = require('@repositories/TTNRepository');
const roleStatusesTTN = require('@const/roleStatusesTTN');

class TTNService {
    constructor({TTNRepository}) {
        this.TTNRepository = TTNRepository;
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

    async update(UpdatedTTN) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.TTNRepository.update(UpdatedTTN, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async remove(TTNId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.TTNRepository.remove(TTNId, transaction);
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

module.exports = new TTNService({TTNRepository});
