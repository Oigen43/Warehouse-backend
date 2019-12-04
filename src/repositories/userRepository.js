'use strict';

const bcrypt = require('bcrypt');
const messageCode = require('@const/messageCode');
const CustomError = require('@const/customError');
const { User, Role } = require('@models');
const mapToCustomError = require('@utils/customErrorsHandler');

class UserRepository {
    async get(data, transaction) {
        try {
            const {page = 1, perPage = 10} = data;
            const start = (page - 1) * perPage;
            const [usersData, usersLength] = await Promise.all([
                User.findAll({ where: {deleted: false}, include: [{ model: Role, through: 'UserRoles', as: 'roles', }], limit: perPage, offset: start, order: ['id'], transaction }),
                User.count({ where: { deleted: false }, raw: true, transaction })
            ]);

            return {
                data: {
                    users: usersData,
                    usersTotal: usersLength
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.USERS_LIST_GET_ERROR);
        }
    }

    async getById(id, transaction) {
        try {
            const user = await User.findOne({ where: { id, deleted: false }, include: [{ model: Role, through: 'UserRoles', as: 'roles', }], transaction });

            if (!user) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.USER_GET_UNKNOWN
                    },
                });
            }

            return {
                data: {
                    user: user
                },
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.USERS_LIST_GET_ERROR);
        }
    }

    async getByCompanyId(data, transaction) {
        try {
            const {page = 1, perPage = 10, companyId} = data;
            const start = (page - 1) * perPage;
            const [usersData, usersLength] = await Promise.all([
                User.findAll({ where: { companyId: companyId, deleted: false }, include: [{ model: Role, through: 'UserRoles', as: 'roles', }], limit: perPage, offset: start, order: ['id'], transaction }),
                User.count({ where: { companyId: companyId, deleted: false }, raw: true, transaction })
            ]);
            return {
                data: {
                    users: usersData,
                    usersTotal: usersLength
                }
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.USERS_LIST_GET_ERROR);
        }
    }

    async getBirthdayBoys(currentDate, transaction) {
        const users = await User.findAll({
            attributes: ['firstName', 'surname', 'email'],
            where: {
                deleted: false,
                confirmationToken: null,
                birthDate: currentDate
            },
            raw: true,
            transaction
        });
        return users;
    }

    async getSystemAdminEmail(transaction) {
        const admin = await User.findOne({
            attributes: ['email'],
            where: {
                companyId: null,
                warehouseId: null
            },
            raw: true,
            transaction
        });
        return admin.email;
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
                warehouseId: newUser.warehouseId || null,
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
            throw mapToCustomError(err, messageCode.USER_CREATE_ERROR);
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

            await User.update(user, { where: { id: user.id }, transaction });

            return {
                data: {
                    data: {
                        statusCode: messageCode.USER_UPDATE_SUCCESS
                    }
                },
                updatedUser: user
            };
        } catch (err) {
            throw mapToCustomError(err, messageCode.USER_UPDATE_ERROR);
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
            throw mapToCustomError(err, messageCode.USER_DELETE_ERROR);
        }
    }

    async findUser(email, password, transaction) {
        try {
            const user = await User.findOne({ where: { email }, raw: true, transaction });
            if (!user) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.USER_INCORRECT_LOGIN_DATA
                    }
                });
            }

            if (user.deleted) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.USER_BLOCKED
                    }
                });
            }

            const passwordIsValid = await bcrypt.compare(password, user.password);
            if (!passwordIsValid) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.USER_INCORRECT_LOGIN_DATA
                    }
                });
            }

            return user;
        } catch (err) {
            throw mapToCustomError(err, messageCode.USER_FIND_ERROR);
        }
    }

    async findRoles(id, transaction) {
        try {
            const rolesList = await User.findOne({
                where: { id },
                include: [{
                    model: Role,
                    as: 'roles',
                    required: false,
                    attributes: ['title'],
                }],
                transaction
            });

            await User.update(
                { loggedAt: new Date() },
                { where: { id }, transaction }
            );

            return rolesList.roles.map(item => item.title);
        } catch (err) {
            throw mapToCustomError(err, messageCode.USER_ROLES_GET_ERROR);
        }
    }

    async findById(id, transaction) {
        try {
            const user = await User.findOne({ where: { id: id }, raw: true, transaction });

            if (!user) {
                throw new CustomError({
                    data: {
                        statusCode: messageCode.USER_GET_UNKNOWN,
                    },
                });
            }

            return user;
        } catch (err) {
            throw mapToCustomError(err, messageCode.USER_GET_ERROR);
        }
    }

    async checkRegistrationToken(user) {
        if (!user.confirmationToken) {
            throw new CustomError({
                data: {
                    statusCode: messageCode.USER_GET_CONFIRMATION_FORM_ERROR,
                },
            });
        }
    }
}

module.exports = new UserRepository();
