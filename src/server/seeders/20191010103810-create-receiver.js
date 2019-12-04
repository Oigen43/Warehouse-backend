'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Receivers', [
        {
            receiverName: 'TRANSMITLY',
            upn: 8294,
            countryCode: '+1',
            date: new Date(),
            deleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            receiverName: 'RECEIVEE',
            upn: 20914,
            countryCode: '+1',
            date: new Date(),
            deleted: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {});
},

down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Receivers', null, {});
}
};
