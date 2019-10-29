'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Carriers', [
            {
                name: 'UPC Inc.',
                upn: 206555,
                countryCode: '+1',
                date: '1990-07-10',
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'FedEx Corp.',
                upn: 20655,
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
