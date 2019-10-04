'use strict';

const bcrypt = require('bcrypt');

const messageCode = require('../const/messageCode');
const User = require('../server/models').User;
const Role = require('../server/models').Role;
const CustomError = require('../const/customError');
const customErrorHandler = require('../utils/customErrorsHandler');

class UserRepository {
    async get(data, transaction) {
        try {
            const {page = 1, perPage = 10} = data;
            const start = (page - 1) * perPage;
            const [usersData, usersLength] = await Promise.all([
                User.findAll({
                    where: {deleted: false},
                    include: [{
                        model: Role,
                        through: 'UserRoles',
                        as: 'roles',
                    }],
                    limit: perPage,
                    offset: start,
                    order: ['id'],
                    transaction
                }),
                User.count({ where: { deleted: false }, raw: true, transaction })
            ]);

            return {
                data: {
                    users: usersData,
                    usersTotal: usersLength
                }
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.USERS_LIST_GET_ERROR);
        }
    }

    async create(newUser, transaction) {
        try {
            let hashedPassword;
            if (newUser.password) {
                hashedPassword = await bcrypt.hash(newUser.password, 8);
            }

            const user = await User.findOne({where: {email: newUser.email}, raw: true, transaction});

            if (user) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.USER_NAME_CONFLICT
                    }
                });
            }

            const userTemplate = {
                firstName: newUser.firstName || null,
                surname: newUser.surname || null,
                patronymic: newUser.patronymic || null,
                email: newUser.email || null,
                address: newUser.address || null,
                birthDate: newUser.birthDate || null,
                login: newUser.login || null,
                password: hashedPassword || null,
                deleted: false,
                companyId: newUser.companyId || null,
                confirmationToken: newUser.confirmationToken || null
            };

            const addedUser = await User.create(userTemplate, {transaction});

            return {
                data: {
                    data: {
                        statusCode: messageCode.USER_CREATE_SUCCESS
                    }
                },
                createdUser: addedUser.dataValues
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.USER_CREATE_ERROR);
        }
    }

    async update(user, transaction) {
        try {
            let hashedPassword;
            let existingUser;
            if (user.password) {
                [hashedPassword, existingUser] = await Promise.all([
                bcrypt.hash(user.password, 8),
                User.findOne({ where: { id: user.id }, raw: true, transaction })
                ]);

                if (!existingUser) {
                    throw new CustomError({
                        data: {
                            statusCode: messageCode.USER_GET_UNKNOWN
                        }
                    });
                }
                user.password = hashedPassword;
            }
            const existedUser = await User.findOne({ where: { email: user.email }, raw: true, transaction });
            if (existedUser && existedUser.id !== user.id) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.USER_NAME_CONFLICT
                    }
                });
            }

            await User.update(user, { where: { id: user.id }, transaction }
            );

            return {
                data: {
                    data: {
                        statusCode: messageCode.USER_UPDATE_SUCCESS
                    }
                },
                updatedUser: user
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.USER_UPDATE_ERROR);
        }
    }

    async remove(userId, transaction) {
        try {
            const existingUser = await User.findOne({ where: { id: userId }, raw: true, transaction });

            if (!existingUser) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.USER_GET_UNKNOWN
                    }
                });
            }

            await User.update(
                { deleted: true },
                { where: { id: userId }, transaction }
            );

            return {
                data: {
                    statusCode: messageCode.USER_DELETE_SUCCESS
                }
            };
        } catch (err) {
            customErrorHandler.check(err, messageCode.USER_DELETE_ERROR);
        }
    }

    async findByEmail(email) {
        const user = await User.findOne({ where: { email: email }, raw: true });

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

    async findById(id) {
        const user = await User.findOne({ where: { id: id }, raw: true });

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

    async findRole(id) {
        const data = await User
        .findOne({
          where: { id },
          include: [{
            model: Role,
            as: 'roles',
            required: false,
            attributes: ['title'],
          }]
        });
        return data.roles.map(item => item.title);
    }

    async loggedAt(userId, logged) {
        await User.update(
            {
                loggedAt: logged
            }, { where: { id: userId } }
        );
    }
}

module.exports = new UserRepository();
