'use strict';

const User = require('../server/models').User;
const Role = require('../server/models').Role;
const RoleUser = require('../server/models').RoleUser;
const bcrypt = require('bcrypt');
const messageCode = require('../const/messageCode');
const roles = require('../const/roles');

class UserRepository {
    async get(data, transaction) {
        const { page = 1, perPage = 10 } = data;
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

    async create(newUser, userRoles, transaction) {
        const [hashedPassword, user] = await Promise.all([
            bcrypt.hash(newUser.password, 8),
            User.findOne({ where: { email: newUser.email }, raw: true, transaction })
        ]);

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

        const addedUser = await User.create(userTemplate, {transaction});

        for (const item of userRoles) {
            const role = roles[item];
            const userRole = {
                userId: addedUser.id,
                roleId: role
            };

            await RoleUser.create(userRole, {transaction});
        }

        return {
            data: {
                statusCode: messageCode.USER_CREATE_SUCCESS
            },
            done: true
        };
    }

    async update(user, userRoles, transaction) {
           const [hashedPassword, existingUser] = await Promise.all([
            bcrypt.hash(user.password, 8),
            User.findOne({ where: { id: user.id }, raw: true, transaction })
        ]);

        if (!existingUser) {
            return {
                data: {
                    statusCode: messageCode.USER_GET_UNKNOWN
                },
                done: false
            };
        }

        const isUserExists = await User.findOne({ where: { email: user.email }, raw: true, transaction });
        if (isUserExists && isUserExists.id !== user.id) {
            return {
                data: {
                    statusCode: messageCode.USER_CONFLICT
                },
                done: false
            };
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

        await RoleUser.destroy({ where: { userId: user.id }, transaction});

        for (const item of userRoles) {
            const role = roles[item];
            const userRole = {
                userId: user.id,
                roleId: role
            };

            await RoleUser.create(userRole, {transaction});
        }

        return {
            data: {
                statusCode: messageCode.USER_UPDATE_SUCCESS
            },
            done: true
        };
    }

    async remove(userId, transaction) {
        const existingUser = await User.findOne({ where: { id: userId }, raw: true, transaction });

        if (!existingUser) {
            return {
                data: {
                    statusCode: messageCode.USER_GET_UNKNOWN
                },
                done: false
            };
        }

        await User.update(
            { deleted: true },
            { where: { id: userId }, transaction }
        );

        return {
            data: {
                statusCode: messageCode.USER_DELETE_SUCCESS
            },
            done: true
        };
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
}

module.exports = new UserRepository();
