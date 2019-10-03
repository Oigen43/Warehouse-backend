'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('RoleUsers', [
            {
                userId: 1,
                roleId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 2,
                roleId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                userId: 3,
                roleId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('RoleUsers', null, {});
    }
};
