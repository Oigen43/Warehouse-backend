'use strict';

const messageCode = require('../const/messageCode');
const roles = require('../const/roles');
const RoleUser = require('../server/models').RoleUser;

class UserRolesRepository {
    async create(userRoles, createdUser, transaction) {
        const promises = userRoles.map(item =>
            RoleUser.create({ userId: createdUser.id, roleId: roles[item], transaction})
        );
        await Promise.all(promises);

        return {
            data: {
                statusCode: messageCode.USER_CREATE_SUCCESS
            },
            done: true
        };
    }

    async destroy(user, transaction) {
        await RoleUser.destroy({ where: { userId: user.id }, transaction});
    }
}

module.exports = new UserRolesRepository();
