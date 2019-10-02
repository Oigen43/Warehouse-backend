'use strict';

const sequelize = require('../server/models').sequelize;
const companyRepository = require('../repositories/companyRepository');
const userRepository = require('../repositories/userRepository');
const userRolesRepository = require('../repositories/userRolesRepository');
const messageCode = require('../const/messageCode');
const sendGrid = require('../utils/sendGrid');
const mailsGenerator = require('../utils/mailsGenerator');
const jwt = require('jsonwebtoken');
const config = require('../config');

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

        let transaction;

        try {
            transaction = await sequelize.transaction();
            const companyData = await this.companyRepository.create(company, transaction);
            if (companyData.done) {
                user.data.companyId = companyData.data.createdCompany.id;
                const userData = await this.userRepository.create(user.data, transaction);
                if (userData.done) {
                    const token = jwt.sign({ id: userData.data.createdUser.id }, config.JWT.secret, {
                        expiresIn: config.JWT.confirmationLife
                    });
                    userData.data.createdUser.confirmationToken = token;
                    const promiseData = await Promise.all([
                        this.userRepository.update(userData.data.createdUser, transaction),
                        this.userRolesRepository.create(user.roles, userData.data.createdUser, transaction)
                    ]);
                    data = promiseData[1];
                    const message = mailsGenerator.getRegistrationMail(userData.data.createdUser.firstName, userData.data.createdUser.email, token);
                    sendGrid.sendMail(message);
                    await transaction.commit();
                } else {
                    data = userData;
                    await transaction.rollback();
                }
            } else {
                data = companyData;
                await transaction.rollback();
            }
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
