'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Roles', [
            {
                title: 'System Admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Company Admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Warehouse Dispatcher',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Warehouse Controller',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Warehouse Manager',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Roles', null, {});
    }
};
