'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Goods', [
            {
                name: 'apples',
                size: 20,
                storageType: 'cold',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'wine',
                size: 15,
                storageType: 'heated',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'bricks',
                size: 28,
                storageType: 'outside',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Goods', null, {});
    }
};
