'use strict';
module.exports = (sequelize, DataTypes) => {
  const TTN = sequelize.define('TTN', {
    number: DataTypes.INTEGER,
    dischargeDate: DataTypes.DATE,
    registrationDate: DataTypes.DATE,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    sender: DataTypes.STRING,
    carrier: DataTypes.STRING,
    transport: DataTypes.STRING,
    driver: DataTypes.STRING,
    dispatcher: DataTypes.STRING,
    warehouseId: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {});
  TTN.associate = function(models) {
    TTN.belongsTo(models.Warehouse, {
      foreignKey: 'warehouseId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return TTN;
};
