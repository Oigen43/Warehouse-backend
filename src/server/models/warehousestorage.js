'use strict';
module.exports = (sequelize, DataTypes) => {
  const WarehouseStorage = sequelize.define('WarehouseStorage', {
    warehouseId: DataTypes.INTEGER,
    storageId: DataTypes.INTEGER
  }, {});
  WarehouseStorage.associate = function(models) {
    // associations can be defined here
  };
  return WarehouseStorage;
};
