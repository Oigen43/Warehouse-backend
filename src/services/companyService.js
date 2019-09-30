'use strict';

const sequelize = require('../server/models').sequelize;
const companyRepository = require('../repositories/companyRepository');
const userRepository = require('../repositories/userRepository');
const userRolesRepository = require('../repositories/userRolesRepository');
const messageCode = require('../const/messageCode');

class CompanyService {
    constructor({ companyRepository, userRepository, userRolesRepository }) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.userRolesRepository = userRolesRepository;
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

    async create(company, user) {
        let data = {
            statusCode: messageCode.TRANSACTION_FAILED,
            done: false
        };

        const res = await this.userRepository.findByEmail(user.data.email);

        if (res.done) {
            return {
                data: {
                    statusCode: messageCode.USER_CONFLICT
                },
                done: false
            };
        }

        let transaction;

        try {
            transaction = await sequelize.transaction();
            const companyData = await this.companyRepository.create(company, transaction);
            if (companyData.done) {
                user.data.companyId = companyData.data.createdCompany.id;
                const userData = await this.userRepository.create(user.data);
                if (userData.done) {
                    data = await this.userRolesRepository.create(user.roles, userData.data.createdUser, transaction);
                } else {
                    await transaction.rollback();
                    data = userData;
                }
            } else {
                data = companyData;
                await transaction.rollback();
            }

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

module.exports = new CompanyService({companyRepository, userRepository, userRolesRepository});
