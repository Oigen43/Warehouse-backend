'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transportType: {
        type: Sequelize.STRING
      },
      transportNumber: {
        type: Sequelize.STRING
      },
      carrierId: {
        type: Sequelize.INTEGER
      },
      carrierName: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      deleted: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transports');
  }
};
