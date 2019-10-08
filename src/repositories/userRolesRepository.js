'use strict';

const roles = require('../const/roles');
const { RoleUser } = require('../server/models');
const messageCode = require('../const/messageCode');
const mapToCustomError = require('../utils/customErrorsHandler');

class UserRolesRepository {
    async create(userRoles, createdUser, transaction) {
        try {
            const promises = userRoles.map(item =>
                RoleUser.create({ userId: createdUser.id, roleId: roles.indexes[item], transaction})
            );
            await Promise.all(promises);
        } catch (err) {
            throw mapToCustomError(err, messageCode.USER_CREATE_ROLE_ERROR);
        }
    }

    async destroy(user, transaction) {
        try {
            await RoleUser.destroy({ where: { userId: user.id }, transaction});
        } catch (err) {
            throw mapToCustomError(err, messageCode.USER_UPDATE_ROLE_ERROR);
        }
    }
}

module.exports = new UserRolesRepository();
