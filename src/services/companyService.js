'use strict';

const jwt = require('jsonwebtoken');
const { sequelize } = require('@models');
const companyRepository = require('@repositories/companyRepository');
const historyPriceRepository = require('@repositories/historyPriceRepository');
const userRepository = require('@repositories/userRepository');
const userRolesRepository = require('@repositories/userRolesRepository');
const emailService = require('@services/emailService');
const mailsGenerator = require('@utils/mailsGenerator');
const config = require('@config');

class CompanyService {
    constructor({ companyRepository, historyPriceRepository, userRepository, userRolesRepository, emailService }) {
        this.companyRepository = companyRepository;
        this.historyPriceRepository = historyPriceRepository;
        this.userRepository = userRepository;
        this.userRolesRepository = userRolesRepository;
        this.emailService = emailService;
    }

    async get(page, perPage, id) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data =
                id ? await this.companyRepository.getById(id, transaction) : await this.companyRepository.get({ page, perPage }, transaction);
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
            const data = await this.companyRepository.getById(id, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async updateActive(company) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            company.active ? await this.historyPriceRepository.resume(company, transaction)
                : await this.historyPriceRepository.suspend(company, transaction);
            const data = await this.companyRepository.updateActive(company, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async changePrice(company) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.historyPriceRepository.changePrice(company);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async getPrices(date) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.historyPriceRepository.getPrices(date, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async create(company, priceForm, user) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            company.price = priceForm.dailyPrice;
            const { data, createdCompany } = await this.companyRepository.create(company, transaction);
            this.historyPriceRepository.create(createdCompany, priceForm, transaction);
            user.data.companyId = createdCompany.id;
            const { createdUser } = await this.userRepository.create(user.data, transaction);
            const token = jwt.sign({ id: createdUser.id }, config.JWT.secret, {
                expiresIn: config.JWT.confirmationLife
            });
            createdUser.confirmationToken = token;
            await Promise.all([
                this.userRepository.update(createdUser, transaction),
                this.userRolesRepository.create(user.roles, createdUser, transaction)
            ]);
            const message = mailsGenerator.getRegistrationMail(createdUser.firstName, createdUser.email, token);
            await this.emailService.sendMail(message);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
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

module.exports = new CompanyService({companyRepository, historyPriceRepository, userRepository, userRolesRepository, emailService});
