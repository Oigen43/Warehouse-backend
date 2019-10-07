'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Storages', [
            {
                storageCapacity: 20,
                warehouseId: 1,
                storageTypeId: 1,
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                storageCapacity: 50,
                warehouseId: 2,
                storageTypeId: 2,
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Storages', null, {});
    }
};
