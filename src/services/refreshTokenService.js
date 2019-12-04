'use strict';

const jwt = require('jsonwebtoken');
const { sequelize } = require('@models');
const config = require('@config');
const messageCode = require('@const/messageCode');
const userRepository = require('@repositories/userRepository');

class RefreshTokenService {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async refresh(userId) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const roles = await this.userRepository.findRoles(userId, transaction);
            const token = jwt.sign({id: userId, roles}, config.JWT.secret, {
                expiresIn: config.JWT.life
            });
            const refreshToken = jwt.sign({id: userId, roles}, config.JWT.secret, {
                expiresIn: config.JWT.refreshTokenLife
            });

            await transaction.commit();
            return {
                data: {
                    statusCode: messageCode.USER_LOG_IN,
                    token,
                    refreshToken
                }
            };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}

module.exports = new RefreshTokenService({ userRepository });
