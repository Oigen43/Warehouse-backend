'use strict';

const jwt = require('jsonwebtoken');
const { sequelize } = require('@models');
const config = require('@config');
const userRepository = require('@repositories/userRepository');
const companyRepository = require('@repositories/companyRepository');
const messageCode = require('@const/messageCode');

class LoginService {
    constructor({ userRepository, companyRepository }) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    async login(email, password) {
        let transaction;

        try {
            transaction = await sequelize.transaction();
            const user = await this.userRepository.findUser(email, password, transaction);
            if (user.companyId) {
                await this.companyRepository.checkActive(user.companyId, transaction);
            }
            const roles = await this.userRepository.findRoles(user.id, transaction);
            const token = jwt.sign({ id: user.id, roles }, config.JWT.secret, {
                expiresIn: config.JWT.life
            });
            const refreshToken = jwt.sign({ id: user.id, roles }, config.JWT.secret, {
                expiresIn: config.JWT.refreshTokenLife
            });

            await transaction.commit();
            return {
                data: {
                    statusCode: messageCode.USER_LOG_IN,
                    roles,
                    token,
                    refreshToken,
                }
            };
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}

module.exports = new LoginService({userRepository, companyRepository});
