'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Goods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      volume: {
        type: Sequelize.STRING
      },
      count: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      recommendation: {
        type: Sequelize.STRING
      },
      TTNId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'TTNs',
          key: 'id',
          as: 'TTNId'
        }
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
    return queryInterface.dropTable('Goods');
  }
};
