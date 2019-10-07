'use strict';
module.exports = (sequelize, DataTypes) => {
  const StorageType = sequelize.define('StorageType', {
    type: DataTypes.STRING
  }, {});
  StorageType.associate = function(models) {
    StorageType.hasMany(models.Storage, {
      foreignKey: 'storageTypeId',
      as: 'storages'
    });
  };
  return StorageType;
};
