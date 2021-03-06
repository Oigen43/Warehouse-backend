'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Senders', [
            {
                senderName: 'COLLAIRE',
                upn: 3894,
                countryCode: '+1',
                date: new Date(),
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                senderName: 'ORONOKO',
                upn: 5193,
                countryCode: '+1',
                date: new Date(),
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Senders', null, {});
    }
};
