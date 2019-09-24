'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userRepository = require('../repositories/userRepository');
const messageCode = require('../const/messageCode');

class LoginService {
    constructor({userRepository}) {
        this.userRepository = userRepository;
    }

    async login(email, password) {
        const data = await this.userRepository.findByEmail(email);

        if (!data.done) {
            return {
                data: {
                    statusCode: messageCode.USER_INCORRECT_LOGIN_DATA,
                    token: null
                },
                done: false
            };
        }

        if (data.data.user.deleted) {
            return {
                data: {
                    statusCode: messageCode.USER_BLOCKED,
                    token: null
                },
                done: false
            };
        }

        const passwordIsValid = await bcrypt.compare(password, data.data.user.password);

        if (!passwordIsValid) {
            return {
                data: {
                    statusCode: messageCode.USER_INCORRECT_LOGIN_DATA,
                    token: null
                },
                done: false
            };
        }
        const dataRole = await this.userRepository.findRole(data.data.user.id);
        const token = jwt.sign({ id: data.data.user.id, roles: dataRole }, config.JWT.secret, {
            expiresIn: config.JWT.life
        });

        return {
            data: {
                statusCode: messageCode.USER_LOG_IN,
                roles: dataRole,
                token
            },
            done: true
        };
    }
}

module.exports = new LoginService({userRepository});
