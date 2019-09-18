'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userRepository = require('../repositories/userRepository');

class LoginService {
    constructor({userRepository}) {
        this.userRepository = userRepository;
    }

    async login(email, password) {
        const data = await this.userRepository.findByEmail(email);

        if (!data.done) {
            return {
                data: {
                    message: 'Incorrect username or password',
                    token: null
                },
                done: false
            };
        }

        const passwordIsValid = await bcrypt.compare(password, data.data.user.password);

        if (!passwordIsValid) {
            return {
                data: {
                    message: 'Incorrect username or password',
                    token: null
                },
                done: false
            };
        }

        const token = jwt.sign({ email: data.data.user.email }, config.JWT.secret, {
            expiresIn: config.JWT.life
        });

        return {
            data: {
                message: 'You are login',
                token
            },
            done: true
        };
    }
}

module.exports = new LoginService({userRepository});
