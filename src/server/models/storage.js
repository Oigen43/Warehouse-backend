'use strict';
module.exports = (sequelize, DataTypes) => {
  const Storage = sequelize.define('Storage', {
    storageType: DataTypes.STRING,
    storageCapacity: DataTypes.STRING
  }, {});
  Storage.associate = function(models) {
    Storage.belongsToMany(models.Warehouse, {
    through: 'WarehouseStorage',
      as: 'warehouses',
      foreignKey: 'storageId'
    });
  };
  return Storage;
};
