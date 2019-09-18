'use strict';

const companyRepository = require('../repositories/companyRepository');
const sequelize = require('../server/models').sequelize;

class CompanyService {
    constructor({ companyRepository }) {
        this.companyRepository = companyRepository;
    }

    async get(page, perPage) {
        let data = {
            message: 'Transaction failed',
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.companyRepository.get({ page: page, perPage: perPage }, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }

    async create(company) {
        let data = {
            message: 'Transaction failed',
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.companyRepository.create(company, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }

    async update(company) {
        let data = {
            message: 'Transaction failed',
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.companyRepository.update(company, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }

    async remove(company) {
        let data = {
            message: 'Transaction failed',
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.companyRepository.remove(company, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }
}

module.exports = new CompanyService({companyRepository});
