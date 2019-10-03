'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Storages', [
            {
                storageType: 'HEATED',
                storageCapacity: '12 x 7',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                storageType: 'COLD',
                storageCapacity: '10 x 20',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Storages', null, {});
    }
};
