'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Warehouses', [
            {
                warehouseName: 'PLASMOX',
                address: 'Lenox Road, Germanton, Puerto Rico, 48',
                active: true,
                companyId: 1,
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                warehouseName: 'GRACKER',
                address: 'Williamsburg Street, Crucible, Kentucky, 55',
                active: true,
                companyId: 2,
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Warehouses', null, {});
    }
};
