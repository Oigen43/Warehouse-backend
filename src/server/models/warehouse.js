'use strict';
module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define('Warehouse', {
    warehouseName: DataTypes.STRING,
    companyName: DataTypes.STRING,
    address: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {});
  Warehouse.associate = function(models) {
    // associations can be defined here
  };
  return Warehouse;
};
