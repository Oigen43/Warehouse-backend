'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('GoodsStorages', [
            {
                storageId: 1,
                goodsId: 1,
                size: 20,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                storageId: 2,
                goodsId: 2,
                size: 15,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                storageId: 3,
                goodsId: 3,
                size: 28,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('GoodsStorages', null, {});
    }
};
