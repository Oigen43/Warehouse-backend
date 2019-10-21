'use strict';
module.exports = (sequelize, DataTypes) => {
  const TTN = sequelize.define('TTN', {
    number: DataTypes.INTEGER,
    dischargeDate: DataTypes.STRING,
    registrationDate: DataTypes.DATE,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    carrierId: DataTypes.INTEGER,
    transportId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    warehouseId: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {});
  TTN.associate = function(models) {
    TTN.belongsTo(models.Warehouse, {
      foreignKey: 'warehouseId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    TTN.hasMany(models.Goods, {
      foreignKey: 'TTNId',
      as: 'Goods'
    });
    TTN.belongsTo(models.Sender, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    TTN.belongsTo(models.Receiver, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    TTN.belongsTo(models.Carrier, {
      foreignKey: 'carrierId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    TTN.belongsTo(models.Transport, {
      foreignKey: 'transportId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    TTN.belongsTo(models.Driver, {
      foreignKey: 'driverId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    TTN.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return TTN;
};
