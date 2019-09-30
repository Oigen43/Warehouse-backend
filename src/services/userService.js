'use strict';

const sequelize = require('../server/models').sequelize;
const userRepository = require('../repositories/userRepository');
const userRolesRepository = require('../repositories/userRolesRepository');
const messageCode = require('../const/messageCode');

class UserService {
    constructor({ userRepository, userRolesRepository }) {
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
            data = await this.userRepository.get({ page: page, perPage: perPage }, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }

    async create(user) {
        let data = {
            statusCode: messageCode.TRANSACTION_FAILED,
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const { done, data: { createdUser } } = await this.userRepository.create(user.data, transaction);
            if (done) {
                data = await this.userRolesRepository.create(user.roles, createdUser, transaction);
            }

            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }
        return data;
    }

    async update(user) {
        let data = {
            statusCode: messageCode.TRANSACTION_FAILED,
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const { done, data: { updatedUser } } = await this.userRepository.update(user.data, transaction);
            if (done) {
                await this.userRolesRepository.destroy(updatedUser, transaction);
                data = await this.userRolesRepository.create(user.roles, updatedUser, transaction);
            }
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }

    async remove(userId) {
        let data = {
            statusCode: messageCode.TRANSACTION_FAILED,
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.userRepository.remove(userId, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }
}

module.exports = new UserService({userRepository, userRolesRepository});
