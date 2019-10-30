'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('HistoryPrices', [
        {
          companyId: 1,
          price: 700,
          startDate: '2019-09-01',
          endDate: '2019-10-25',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
        companyId: 2,
        price: 900,
        startDate: '2019-10-01',
        endDate: '2019-10-28',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyId: 1,
        price: 1700,
        startDate: new Date(),
        endDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        companyId: 2,
        price: 1500,
        startDate: new Date(),
        endDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HistoryPrices', null, {});
  }
};
