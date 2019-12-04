'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Transports', [
            {
                transportType: 'Truck',
                transportNumber: 'SMB589',
                carrierId: 1,
                date: new Date(),
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                transportType: 'Train',
                transportNumber: '546A',
                carrierId: 2,
                date: new Date(),
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Transports', null, {});
    }
};
