'use strict';
module.exports = (sequelize, DataTypes) => {
  const Storage = sequelize.define('Storage', {
    storageCapacity: DataTypes.STRING,
    warehouseId: DataTypes.INTEGER,
    storageTypeId: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {});
  Storage.associate = function(models) {
    Storage.belongsTo(models.Warehouse, {
      foreignKey: 'warehouseId'
    });
    Storage.belongsTo(models.StorageType, {
      foreignKey: 'storageTypeId'
    });
  };
  return Storage;
};
