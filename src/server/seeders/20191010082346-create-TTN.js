'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TTNs', [
      {
        number: 56,
        registrationDate: new Date(),
        type: 'incoming',
        status: 'registered',
        carrier: 'UPC Inc.',
        sender_receiver: 'COLLAIRE',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        number: 13,
        registrationDate: new Date(),
        type: 'incoming',
        status: 'confirmed',
        carrier: 'FedEx Corp.',
        sender_receiver: 'ORONOKO',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TTNs', null, {});
  }
};
