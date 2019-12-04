'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('StorageTypes', [
            {
                type: 'COLD',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                type: 'HEATED',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                type: 'REFRIGERATED',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                type: 'OUTSIDE',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('StorageTypes', null, {});
    }
};
