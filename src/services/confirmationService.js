'use strict';

const sequelize = require('../server/models').sequelize;
const userRepository = require('../repositories/userRepository');
const messageCode = require('../const/messageCode');

class ConfirmationService {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async getForm(id) {
        const user = await this.userRepository.findById(id);
        if (user.data.user.confirmationToken) {
            return {
                data: {
                    statusCode: messageCode.USER_GET_CONFIRMATION_FORM_SUCCESS,
                },
                done: true
            };
        }
        return {
            data: {
                statusCode: messageCode.USER_GET_CONFIRMATION_FORM_FAILED,
            },
            done: false
        };
    }

    async confirm(user) {
        let data = {
            statusCode: messageCode.TRANSACTION_FAILED,
            done: false
        };
        let transaction;

        try {
            transaction = await sequelize.transaction();
            await this.userRepository.update(user, transaction);
            data = {
                data: { statusCode: messageCode.USER_REGISTRATION_SUCCESS },
                done: true
            };
            await transaction.commit();
        } catch (err) {
            if (transaction) { await transaction.rollback(); }
        }
        return data;
    }
}

module.exports = new ConfirmationService({ userRepository });
