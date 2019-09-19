'use strict';

const User = require('../server/models').User;
const bcrypt = require('bcrypt');
const messageCode = require('../const/messageCode');

class UserRepository {
    async get(data, transaction) {
        const {page = 1, perPage = 10} = data;
        const start = (page - 1) * perPage;
        const [usersData, usersLength] = await Promise.all([
            User.findAll({
                where: {deleted: false},
                limit: perPage,
                offset: start,
                order: ['id'],
                raw: true,
                transaction
            }),
            User.count({where: {deleted: false}, raw: true, transaction})
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
        const user = await User.findOne({where: {email: newUser.email}, raw: true, transaction});

        if (user) {
            return {
                data: {
                    statusCode: messageCode.USER_CONFLICT
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

        await User.create(userTemplate, {transaction});

        return {
            data: {
                statusCode: messageCode.USER_CREATE_SUCCESS
            },
            done: true
        };
    }

    async update(user, transaction) {
        const hashedPassword = await bcrypt.hash(user.password, 8);
        const existingUser = await User.findOne({where: {id: user.id}, raw: true, transaction});

        if (!existingUser) {
            return {
                data: {
                    statusCode: messageCode.USER_GET_UNKNOWN
                },
                done: false
            };
        }

        const ifUserExists = await User.findOne({where: {email: user.email}, raw: true, transaction});
        if (ifUserExists) {
            if (ifUserExists.id !== user.id) {
                return {
                    data: {
                        statusCode: messageCode.USER_CONFLICT
                    },
                    done: false
                };
            }
        }


        await User.update(
            {
                firstName: user.firstName,
                surname: user.surname,
                patronymic: user.patronymic,
                email: user.email,
                address: user.address,
                birthDate: user.birthDate,
                login: user.login,
                password: hashedPassword
            }, { where: { id: user.id }, transaction }
        );
        return {
            data: {
                statusCode: messageCode.USER_UPDATE_SUCCESS
            },
            done: true
        };
    }

    async remove(user, transaction) {
        const existingUser = await User.findOne({where: {id: user.id}, raw: true, transaction});

        if (!existingUser) {
            return {
                data: {
                    statusCode: messageCode.USER_GET_UNKNOWN
                },
                done: false
            };
        }

        await User.update(
            {deleted: true},
            {where: {firstName: user.firstName}, transaction}
        );

        return {
            data: {
                statusCode: messageCode.USER_DELETE_SUCCESS
            },
            done: true
        };
    }

    async findByEmail(email) {
        const user = await User.findOne({where: {email: email}, raw: true});

        if (!user) {
            return {
                data: {
                    statusCode: messageCode.USER_GET_UNKNOWN,
                    user: null
                },
                done: false
            };
        }
        return {
            data: {
                statusCode: messageCode.USER_GET_SUCCESS,
                user: user
            },
            done: true
        };
    }
}

module.exports = new UserRepository();
