'use strict';
module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define('Warehouse', {
    warehouseName: DataTypes.STRING,
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
    Warehouse.hasMany(models.Storage, {
      foreignKey: 'warehouseId',
      as: 'storages'
    });
  };
  return Warehouse;
};
