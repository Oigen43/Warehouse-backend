'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    companyName: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN,
  }, {});
  Company.associate = function(models) {
    Company.hasMany(models.Warehouse, {
      foreignKey: 'companyId',
      as: 'warehouses'
    });
    Company.hasMany(models.HistoryPrice, {
      foreignKey: 'companyId',
      as: 'historyPrices'
    });
  };
  return Company;
};
