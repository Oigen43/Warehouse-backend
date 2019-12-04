'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Companies', [
            {
                companyName: 'ZANILLA',
                address: 'Clifton Place, Churchill 12',
                description: 'Aliquip velit eiusmod irure nisi quis ut esse nisi esse laboris nostrud id enim.',
                active: true,
                price: 1700,
                date: new Date(),
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                companyName: 'NETPLAX',
                address: 'Verona Street, Hiwasse, Wisconsin, 3',
                description: 'Velit fugiat id fugiat excepteur commodo Lorem velit cillum voluptate ut.',
                active: true,
                price: 1500,
                date: new Date(),
                deleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Companies', null, {});
    }
};
