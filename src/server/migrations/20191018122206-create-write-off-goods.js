'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WriteOffGoods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      originVolume: {
        type: Sequelize.STRING
      },
      currentVolume: {
        type: Sequelize.STRING
      },
      originCount: {
        type: Sequelize.STRING
      },
      currentCount: {
        type: Sequelize.STRING
      },
      originWeight: {
        type: Sequelize.STRING
      },
      currentWeight: {
        type: Sequelize.STRING
      },
      originPrice: {
        type: Sequelize.STRING
      },
      currentPrice: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      writeOffId: {
        type: Sequelize.INTEGER
      },
      TTNId: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('WriteOffGoods');
  }
};
