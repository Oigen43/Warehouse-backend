'use strict';

const { sequelize } = require('@models');
const userRepository = require('@repositories/userRepository');
const userRolesRepository = require('@repositories/userRolesRepository');

class UserService {
    constructor({ userRepository, userRolesRepository }) {
        this.userRepository = userRepository;
        this.userRolesRepository = userRolesRepository;
    }

    async get(page, perPage) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const data = await this.userRepository.get({ page: page, perPage: perPage }, transaction);
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
            await this.userRolesRepository.create(user.roles, createdUser, transaction);
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
            await this.userRolesRepository.create(user.roles, updatedUser, transaction);
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

module.exports = new UserService({userRepository, userRolesRepository});
