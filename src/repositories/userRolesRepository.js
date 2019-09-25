'use strict';

const roles = require('../const/roles');
const RoleUser = require('../server/models').RoleUser;

class UserRolesRepository {
    async create(userRoles, createdUser, transaction) {
        const promises = userRoles.map(item =>
            RoleUser.create({ userId: createdUser.id, roleId: roles[item], transaction})
        );
        await Promise.all(promises);
    }
}

module.exports = new UserRolesRepository();
