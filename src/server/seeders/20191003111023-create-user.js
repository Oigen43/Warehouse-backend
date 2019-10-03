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
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Loraine',
                surname: 'Morton',
                patronymic: 'Green',
                email: 'companyAdmin1@mail.com',
                address: 'Drew Street, Lewis, South Carolina, 34',
                birthDate: '1979-10-05',
                login: 'companyAdmin1',
                password: '$2a$08$YZDkx3blMJBcKBZ8HYlxyu/yIuCqkpLPfQiIDGxPnTLwAP4hgqhg2',
                deleted: false,
                companyId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'Chase',
                surname: 'Wells',
                patronymic: 'Dillard',
                email: 'companyAdmin2@mail.com',
                address: 'Calder Place, Hilltop, California, 40',
                birthDate: '1974-05-21',
                login: 'companyAdmin2',
                password: '$2a$08$YZDkx3blMJBcKBZ8HYlxyu/yIuCqkpLPfQiIDGxPnTLwAP4hgqhg2',
                deleted: false,
                companyId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
