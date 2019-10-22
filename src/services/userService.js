'use strict';

const jwt = require('jsonwebtoken');
const { sequelize } = require('@models');
const userRepository = require('@repositories/userRepository');
const userRolesRepository = require('@repositories/userRolesRepository');
const emailService = require('@services/emailService');
const mailsGenerator = require('@utils/mailsGenerator');
const config = require('@config');

class UserService {
    constructor({ userRepository, userRolesRepository, emailService }) {
        this.userRepository = userRepository;
        this.userRolesRepository = userRolesRepository;
        this.emailService = emailService;
    }

    async get(page, perPage, companyId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data =
                companyId ? await this.userRepository.getByCompanyId({ page: page, perPage: perPage, companyId: companyId }, transaction)
                    : await this.userRepository.get({ page: page, perPage: perPage }, transaction);
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
            const data = await this.userRepository.getById(id, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async create(user) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const { data, createdUser } = await this.userRepository.create(user.data, transaction);
            const token = jwt.sign({ id: createdUser.id }, config.JWT.secret, {
                expiresIn: config.JWT.confirmationLife
            });
            createdUser.confirmationToken = token;
            await Promise.all([
                this.userRepository.update(createdUser, transaction),
                this.userRolesRepository.create(user.selectedRoles, createdUser, transaction)
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

    async update(user) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const { data, updatedUser } = await this.userRepository.update(user.data, transaction);
            await this.userRolesRepository.destroy(updatedUser, transaction);
            await this.userRolesRepository.create(user.selectedRoles, updatedUser, transaction);
            await transaction.commit();
            return data;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async remove(userId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.userRepository.remove(userId, transaction);
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

module.exports = new UserService({userRepository, userRolesRepository, emailService});
