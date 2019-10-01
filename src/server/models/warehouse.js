'use strict';
module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define('Warehouse', {
    warehouseName: DataTypes.STRING,
    companyName: DataTypes.STRING,
    address: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    companyId: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {});
  Warehouse.associate = function(models) {
    Warehouse.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Warehouse.belongsToMany(models.Storage, {
      through: 'WarehouseStorage',
      as: 'storages',
      foreignKey: 'warehouseId'
    });
  };
  return Warehouse;
};
