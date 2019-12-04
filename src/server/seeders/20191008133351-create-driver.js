'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Drivers', [
      {
        firstName: 'Tyler',
        surname: 'Durden',
        passportNumber: '183742',
        issuingDate: '1998-07-10',
        deleted: false,
        carrierId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'James',
        surname: 'Tompson',
        passportNumber: '427291',
        issuingDate: '2000-05-11',
        deleted: false,
        carrierId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Drivers', null, {});
  }
};
