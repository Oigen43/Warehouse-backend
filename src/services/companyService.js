'use strict';

const sequelize = require('../server/models').sequelize;
const companyRepository = require('../repositories/companyRepository');
const messageCode = require('../const/messageCode');

class CompanyService {
    constructor({ companyRepository }) {
        this.companyRepository = companyRepository;
    }

    async get(page, perPage) {
        let data = {
            statusCode: messageCode.TRANSACTION_FAILED,
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
            statusCode: messageCode.TRANSACTION_FAILED,
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
            statusCode: messageCode.TRANSACTION_FAILED,
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

    async remove(companyId) {
        let data = {
            statusCode: messageCode.TRANSACTION_FAILED,
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.companyRepository.remove(companyId, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }
}

module.exports = new CompanyService({companyRepository});
