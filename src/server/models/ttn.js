'use strict';
module.exports = (sequelize, DataTypes) => {
  const TTN = sequelize.define('TTN', {
    number: DataTypes.INTEGER,
    dischargeDate: DataTypes.STRING,
    registrationDate: DataTypes.DATE,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
    sender: DataTypes.STRING,
    carrier: DataTypes.STRING,
    transport: DataTypes.STRING,
    driver: DataTypes.STRING,
    dispatcherId: DataTypes.INTEGER,
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
  };
  return TTN;
};
