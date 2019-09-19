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

        const token = jwt.sign({ sub: data.data.user.id }, config.JWT.secret, {
            expiresIn: config.JWT.life
        });

        return {
            data: {
                statusCode: messageCode.USER_LOG_IN,
                token
            },
            done: true
        };
    }
}

module.exports = new LoginService({userRepository});
