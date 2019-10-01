'use strict';

const userRepository = require('../repositories/userRepository');
const messageCode = require('../const/messageCode');

class ConfirmationService {
    constructor({userRepository}) {
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
        return {
            data: {
                statusCode: messageCode.USER_REGISTRATION_SUCCESS,
            },
            done: true
        };
    }
}

module.exports = new ConfirmationService({userRepository});
