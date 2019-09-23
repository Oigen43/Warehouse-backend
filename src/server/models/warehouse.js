'use strict';
module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define('Warehouse', {
    warehouseName: DataTypes.STRING,
    companyName: DataTypes.STRING,
    address: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {});
  Warehouse.associate = function(models) {
    // associations can be defined here
    Warehouse.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE'
    });
  };
  return Warehouse;
};
