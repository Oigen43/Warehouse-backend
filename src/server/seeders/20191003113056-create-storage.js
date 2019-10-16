'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Storages', [
            {
                storageCapacity: 20,
                currentCapacity: 0,
                warehouseId: 1,
                storageTypeId: 1,
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                storageCapacity: 50,
                currentCapacity: 35,
                warehouseId: 1,
                storageTypeId: 2,
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                storageCapacity: 40,
                currentCapacity: 12,
                warehouseId: 1,
                storageTypeId: 4,
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                storageCapacity: 36,
                currentCapacity: 36,
                warehouseId: 2,
                storageTypeId: 3,
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
