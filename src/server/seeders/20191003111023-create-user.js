'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                firstName: 'Rosanne',
                surname: 'Waters',
                patronymic: 'Witt',
                email: 'admin@mail.com',
                address: 'Keller Will Place 57',
                birthDate: '1956-07-10',
                login: 'admin',
                password: '$2a$08$YZDkx3blMJBcKBZ8HYlxyu/yIuCqkpLPfQiIDGxPnTLwAP4hgqhg2',
                deleted: false,
                companyId: null,
                warehouseId: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Loraine',
                surname: 'Morton',
                patronymic: 'Green',
                email: 'companyAdmin@mail.com',
                address: 'Drew Street, Lewis, South Carolina, 34',
                birthDate: '1979-10-05',
                login: 'companyAdmin1',
                password: '$2a$08$YZDkx3blMJBcKBZ8HYlxyu/yIuCqkpLPfQiIDGxPnTLwAP4hgqhg2',
                deleted: false,
                companyId: 1,
                warehouseId: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Chase',
                surname: 'Wells',
                patronymic: 'Dillard',
                email: 'warehouseDispatcher@mail.com',
                address: 'Calder Place, Hilltop, California, 40',
                birthDate: '1974-05-21',
                login: 'warehouseDispatcher',
                password: '$2a$08$YZDkx3blMJBcKBZ8HYlxyu/yIuCqkpLPfQiIDGxPnTLwAP4hgqhg2',
                deleted: false,
                companyId: 1,
                warehouseId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Ron',
                surname: 'Weasley',
                patronymic: 'Finn',
                email: 'warehouseController@mail.com',
                address: 'Calder Place, Hilltop, California, 40',
                birthDate: '1970-07-11',
                login: 'warehouseController',
                password: '$2a$08$YZDkx3blMJBcKBZ8HYlxyu/yIuCqkpLPfQiIDGxPnTLwAP4hgqhg2',
                deleted: false,
                companyId: 1,
                warehouseId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Harry',
                surname: 'Potter',
                patronymic: 'John',
                email: 'warehouseManager@mail.com',
                address: 'Calder Place, Hilltop, California, 40',
                birthDate: '1970-07-31',
                login: 'warehouseManager',
                password: '$2a$08$YZDkx3blMJBcKBZ8HYlxyu/yIuCqkpLPfQiIDGxPnTLwAP4hgqhg2',
                deleted: false,
                companyId: 1,
                warehouseId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
