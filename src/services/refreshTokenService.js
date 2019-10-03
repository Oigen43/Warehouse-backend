'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');
const messageCode = require('../const/messageCode');
const userRepository = require('../repositories/userRepository');

class RefreshTokenService {
    constructor({userRepository}) {
        this.userRepository = userRepository;
    }

    async refresh(userId) {
        const roles = await this.userRepository.findRole(userId);
        const logged = new Date();
        const token = jwt.sign({id: userId, roles: roles}, config.JWT.secret, {
            expiresIn: config.JWT.life
        });
        const refreshToken = jwt.sign({id: userId, roles: roles}, config.JWT.secret, {
            expiresIn: config.JWT.refreshTokenLife
        });

        await this.userRepository.loggedAt(userId, logged);

        return {
            data: {
                statusCode: messageCode.USER_LOG_IN,
                token,
                refreshToken
            },
            done: true
        };
    }
}

module.exports = new RefreshTokenService({userRepository});
