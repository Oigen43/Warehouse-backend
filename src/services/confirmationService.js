'use strict';

const { sequelize } = require('@models');
const userRepository = require('@repositories/userRepository');
const messageCode = require('@const/messageCode');

class ConfirmationService {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async getForm(id) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const user = await this.userRepository.findById(id, transaction);
            await this.userRepository.checkRegistrationToken(user);

            return {
                data: {
                    statusCode: messageCode.USER_GET_CONFIRMATION_FORM_SUCCESS,
                }
            };
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }

    async confirm(user) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            await this.userRepository.update(user, transaction);

            await transaction.commit();
            return {
                data: { statusCode: messageCode.USER_REGISTRATION_SUCCESS }
            };
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
                throw err;
            }
        }
    }
}

module.exports = new ConfirmationService({ userRepository });
