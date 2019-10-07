'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Carriers', [
            {
                name: 'UPC Inc.',
                upn: '206 555 0100',
                countryCode: '+1',
                date: '1990-07-10',
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'FedEx Corp.',
                upn: '206 555 5230',
                countryCode: '+1',
                date: '1995-08-11',
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Carriers', null, {});
    }
};
