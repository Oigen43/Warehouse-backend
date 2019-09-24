'use strict';

const userRepository = require('../repositories/userRepository');
const sequelize = require('../server/models').sequelize;

class UserService {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async get(page, perPage) {
        let data = {
            message: 'Transaction failed',
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

    async create(user, selectedRoles) {
        let data = {
            message: 'Transaction failed',
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.userRepository.create(user, selectedRoles, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }

    async update(user) {
        let data = {
            message: 'Transaction failed',
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            data = await this.userRepository.update(user, transaction);
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }

        return data;
    }

    async remove(userId) {
        let data = {
            message: 'Transaction failed',
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

module.exports = new UserService({userRepository});
