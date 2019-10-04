'use strict';

const jwt = require('jsonwebtoken');
const sequelize = require('../server/models').sequelize;
const companyRepository = require('../repositories/companyRepository');
const userRepository = require('../repositories/userRepository');
const userRolesRepository = require('../repositories/userRolesRepository');
const emailService = require('../services/emailService');
const mailsGenerator = require('../utils/mailsGenerator');
const messageCode = require('../const/messageCode');
const config = require('../config');

class CompanyService {
    constructor({ companyRepository, userRepository, userRolesRepository, emailService }) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.userRolesRepository = userRolesRepository;
        this.emailService = emailService;
    }

    async get(page, perPage) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.companyRepository.get({ page: page, perPage: perPage }, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
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
                    const emailData = await this.emailService.sendRegistrationEmail(message);
                    if (emailData.done) {
                        await transaction.commit();
                    } else {
                        data = emailData;
                        await transaction.rollback();
                    }
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
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.companyRepository.update(company, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async remove(companyId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.companyRepository.remove(companyId, transaction);
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

module.exports = new CompanyService({companyRepository, userRepository, userRolesRepository, emailService});
