'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('WarehouseStorages', [
            {
                warehouseId: 1,
                storageId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                warehouseId: 2,
                storageId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('WarehouseStorages', null, {});
    }
};
