'use strict';

const roles = require('../const/roles');
const RoleUser = require('../server/models').RoleUser;
const messageCode = require('../const/messageCode');
const customErrorHandler = require('../utils/customErrorsHandler');

class UserRolesRepository {
    async create(userRoles, createdUser, transaction) {
        try {
            const promises = userRoles.map(item =>
                RoleUser.create({ userId: createdUser.id, roleId: roles[item], transaction})
            );
            await Promise.all(promises);
        } catch (err) {
            customErrorHandler.check(err, messageCode.USER_CREATE_ROLE_ERROR);
        }
    }

    async destroy(user, transaction) {
        try {
            await RoleUser.destroy({ where: { userId: user.id }, transaction});
        } catch (err) {
            customErrorHandler.check(err, messageCode.USER_UPDATE_ROLE_ERROR);
        }
    }
}

module.exports = new UserRolesRepository();
