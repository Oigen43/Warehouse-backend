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
        type: Sequelize.STRING
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
      description: {
        type: Sequelize.STRING
      },
      carrierId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Carriers',
          key: 'id',
          as: 'carrierId'
        }
      },
      senderId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Senders',
          key: 'id',
          as: 'senderId'
        }
      },
      transportId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Transports',
          key: 'id',
          as: 'transportId'
        }
      },
      driverId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Drivers',
          key: 'id',
          as: 'driverId'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
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
