'use strict';

const User = require('../server/models').User;
const bcrypt = require('bcrypt');
const messageCode = require('../const/messageCode');

class UserRepository {
    async get(data, transaction) {
        const { page = 1, perPage = 10 } = data;
        const start = (page - 1) * perPage;
        const [usersData, usersLength] = await Promise.all([
            User.findAll({ where: { deleted: false }, limit: perPage, offset: start, order: ['id'], raw: true, transaction }),
            User.count({ where: { deleted: false }, raw: true, transaction })
        ]);
        return {
            data: {
                users: usersData,
                usersTotal: usersLength
            },
            done: true
        };
    }

    async create(newUser, transaction) {
        const hashedPassword = await bcrypt.hash(newUser.password, 8);
        const user = await User.findOne({ where: { email: newUser.email }, raw: true, transaction });

        if (user) {
            return {
                data: {
                    statusCode: messageCode.USER_EXISTS
                },
                done: false
            };
        }

        const userTemplate = {
            firstName: newUser.firstName,
            surname: newUser.surname,
            patronymic: newUser.patronymic,
            email: newUser.email,
            address: newUser.address,
            birthDate: newUser.birthDate,
            login: newUser.login,
            password: hashedPassword,
            deleted: false,
        };

        await User.create(userTemplate, { transaction });

        return {
            data: {
                statusCode: messageCode.USER_CREATED
            },
            done: true
        };
    }

    async update(user, transaction) {
        const existingUser = await User.findOne({ where: { email: user.email }, raw: true, transaction });

        if (!existingUser) {
            return {
              data: {
                  statusCode: messageCode.USER_NOT_EXIST
              },
              done: false
            };
        }

        await User.update(
            {
                firstName: user.firstName,
                surname: user.surname,
                patronymic: user.patronymic,
                address: user.address,
                birthDate: user.birthDate,
                login: user.login,
                password: user.password
            },
            { where: { email: user.email }, transaction }
        );

        return {
            data: {
                statusCode: messageCode.USER_UPDATED
            },
            done: true
        };
    }

    async remove(user, transaction) {
        const existingUser = await User.findOne({ where: { firstName: user.firstName }, raw: true, transaction });

        if (!existingUser) {
            return {
                data: {
                    statusCode: messageCode.USER_NOT_EXIST
                },
                done: false
            };
        }

        await User.update(
            { deleted: true },
            { where: { firstName: user.firstName }, transaction }
        );

        return {
            data: {
                statusCode: messageCode.USER_DELETED
            },
            done: true
        };
    }

    async findByEmail(email) {
        const user = await User.findOne({ where: { email: email }, raw: true });

        if (!user) {
            return {
                data: {
                    statusCode: messageCode.USER_NOT_EXIST,
                    user: null
                },
                done: false
            };
        }
        return {
            data: {
                statusCode: messageCode.USER_EXISTS,
                user: user
            },
            done: true
        };
    }
}

module.exports = new UserRepository();
