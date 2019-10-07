'use strict';

const jwt = require('jsonwebtoken');
const sequelize = require('../server/models').sequelize;
const companyRepository = require('../repositories/companyRepository');
const userRepository = require('../repositories/userRepository');
const userRolesRepository = require('../repositories/userRolesRepository');
const emailService = require('../services/emailService');
const mailsGenerator = require('../utils/mailsGenerator');
const config = require('../config');

class CompanyService {
    constructor({ companyRepository, userRepository, userRolesRepository, emailService }) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.userRolesRepository = userRolesRepository;
        this.emailService = emailService;
    }

    async get(page, perPage, id) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.companyRepository.get({ page, perPage, id }, transaction);
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
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const { data, createdCompany } = await this.companyRepository.create(company, transaction);
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

module.exports = new CompanyService({companyRepository, userRepository, userRolesRepository, emailService});
