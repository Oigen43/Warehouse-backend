'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TTNs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.INTEGER
      },
      dischargeDate: {
        type: Sequelize.DATE
      },
      registrationDate: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      carrier: {
        type: Sequelize.STRING
      },
      sender: {
        type: Sequelize.STRING
      },
      transport: {
        type: Sequelize.STRING
      },
      driver: {
        type: Sequelize.STRING
      },
      dispatcher: {
        type: Sequelize.STRING
      },
      warehouseId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Warehouses',
          key: 'id',
          as: 'warehouseId'
        }
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
    return queryInterface.dropTable('TTNs');
  }
};
